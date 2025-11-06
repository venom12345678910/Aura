import React from 'react';
import { SubScreenWrapper } from './SubScreenWrapper';

const EventCard: React.FC<{ title: string, description: string, imageUrl: string }> = ({ title, description, imageUrl }) => (
    <div className="relative rounded-lg overflow-hidden glassmorphism border-purple-400/30 border transition-transform hover:scale-105 cursor-pointer">
        <img src={imageUrl} alt={title} className="w-full h-32 object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm text-gray-300">{description}</p>
        </div>
    </div>
);

export const EventsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const events = [
        { title: 'Rocket Rush', description: 'Launch the most rockets to win!', imageUrl: 'https://images.unsplash.com/photo-1541185934-01b600ea069c?q=80&w=800&auto=format&fit=crop' },
        { title: 'Gifter of the Week', description: 'Top gifters get exclusive rewards.', imageUrl: 'https://images.unsplash.com/photo-1599050751982-9d3d3b7e2e3a?q=80&w=800&auto=format&fit=crop' },
        { title: 'Karaoke Kings', description: 'Sing your heart out in music rooms.', imageUrl: 'https://images.unsplash.com/photo-1516280440614-376394488837?q=80&w=800&auto=format&fit=crop' },
    ];
    return (
        <SubScreenWrapper title="Events" onBack={onBack}>
            <div className="p-4 space-y-4">
                {events.map(event => <EventCard key={event.title} {...event} />)}
            </div>
        </SubScreenWrapper>
    );
};