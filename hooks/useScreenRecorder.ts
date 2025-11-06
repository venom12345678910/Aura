

import { useState, useRef, useCallback } from 'react';
import { useToast } from '../components/Toast';

type RecordingStatus = 'idle' | 'recording' | 'error';

export const useScreenRecorder = () => {
    const [status, setStatus] = useState<RecordingStatus>('idle');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<Blob[]>([]);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const { addToast } = useToast();

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && status === 'recording') {
            // This will trigger the onstop event handler, which will handle all cleanup.
            mediaRecorderRef.current.stop();
        }
    }, [status]);


    const startRecording = useCallback(async () => {
        if (status === 'recording') return;
        
        if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
            const errorMsg = 'Screen recording is not supported by your browser or device.';
            console.error(errorMsg);
            addToast(errorMsg, 'error');
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        try {
            // Get screen stream (video + system audio if available)
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                // audio: true, // Removed: This is not universally supported and can cause the getDisplayMedia function to be unavailable.
            });

            // Get user microphone stream
            const micStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
            });

            // Combine video track from screen and audio tracks from both streams
            const combinedStream = new MediaStream([
                ...screenStream.getVideoTracks(),
                ...micStream.getAudioTracks(),
                // ...screenStream.getAudioTracks() // Removed since we are no longer requesting it.
            ]);
            mediaStreamRef.current = combinedStream;

            // Add a handler to stop recording when the user clicks the browser's "Stop sharing" button
            screenStream.getVideoTracks()[0].onended = () => {
                stopRecording();
            };

            const options = {
                mimeType: 'video/webm; codecs=vp9,opus'
            };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.warn(`${options.mimeType} is not supported, falling back to default.`);
                options.mimeType = 'video/webm';
            }

            const recorder = new MediaRecorder(combinedStream, options);

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `aura-room-recording-${new Date().toISOString()}.webm`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                recordedChunksRef.current = [];
                setStatus('idle');
                addToast('Recording saved to your downloads!', 'success');

                // Final cleanup of streams
                if (mediaStreamRef.current) {
                  mediaStreamRef.current.getTracks().forEach(track => track.stop());
                  mediaStreamRef.current = null;
                }
            };
            
            mediaRecorderRef.current = recorder;
            recordedChunksRef.current = [];
            recorder.start();
            setStatus('recording');
            addToast('Screen recording started!', 'info');

        } catch (err: any) {
            console.error('Error starting screen recording:', err);
            if (err.name === 'NotAllowedError') {
                addToast('Permission denied for screen recording.', 'error');
            } else {
                addToast('Failed to start screen recording.', 'error');
            }
            setStatus('error');
            setTimeout(() => setStatus('idle'), 2000); // Reset after error
        }
    }, [addToast, status, stopRecording]);


    return { status, startRecording, stopRecording };
};