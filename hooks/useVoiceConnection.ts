import { useState, useEffect, useRef, useCallback } from 'react';

type ConnectionStatus = 'idle' | 'requesting' | 'connecting' | 'connected' | 'muted' | 'error';

export const useVoiceConnection = () => {
    const [status, setStatus] = useState<ConnectionStatus>('idle');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const connect = useCallback(async () => {
        if (mediaStreamRef.current) return;

        setStatus('requesting');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            setStatus('connecting');

            // Simulate connection delay
            setTimeout(() => {
                setStatus('connected');
                
                const audioContext = new AudioContext();
                audioContextRef.current = audioContext;
                const analyser = audioContext.createAnalyser();
                analyserRef.current = analyser;
                analyser.fftSize = 512;
                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);

                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                const checkSpeaking = () => {
                    if (!analyserRef.current) return;
                    analyserRef.current.getByteFrequencyData(dataArray);
                    const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
                    setIsSpeaking(average > 10); // Threshold for speaking
                    animationFrameRef.current = requestAnimationFrame(checkSpeaking);
                };
                checkSpeaking();

            }, 1000);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            setStatus('error');
        }
    }, []);

    const disconnect = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        analyserRef.current = null;
        setStatus('idle');
        setIsSpeaking(false);
    }, []);

    const toggleMute = useCallback(() => {
        if (mediaStreamRef.current && (status === 'connected' || status === 'muted')) {
            const isMuted = status === 'muted';
            mediaStreamRef.current.getAudioTracks().forEach(track => {
                track.enabled = isMuted;
            });
            setStatus(isMuted ? 'connected' : 'muted');
        }
    }, [status]);

    useEffect(() => {
        return () => {
            disconnect();
        };
    }, [disconnect]);

    return { status, isSpeaking, connect, disconnect, toggleMute };
};
