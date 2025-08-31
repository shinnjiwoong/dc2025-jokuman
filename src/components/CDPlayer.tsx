'use client';

import { useRef, useEffect } from 'react';

interface Song {
    id: number;
    title: string;
    artist: string;
    src: string;
    cover: string;
}

interface CDPlayerProps {
    songs: Song[];
    currentSongIndex: number;
    onSongChange: (index: number) => void;
    isActive: boolean;
    onPlayPause: (isPlaying: boolean) => void;
    onTimeUpdate: (currentTime: number) => void;
    onDurationChange: (duration: number) => void;
    globalIsPlaying: boolean;
    audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function CDPlayer({
    songs,
    currentSongIndex,
    onSongChange,
    isActive,
    onPlayPause,
    onTimeUpdate,
    onDurationChange,
    globalIsPlaying,
    audioRef,
}: CDPlayerProps) {
    const currentSong = songs[currentSongIndex];

    useEffect(() => {
        if (audioRef.current && isActive) {
            audioRef.current.src = currentSong.src;
        }
    }, [currentSongIndex, currentSong.src, isActive, audioRef]);

    useEffect(() => {
        if (audioRef.current && isActive) {
            if (globalIsPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isActive, globalIsPlaying, audioRef]);

    const togglePlayPause = () => {
        if (isActive) {
            onPlayPause(!globalIsPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current && isActive) {
            onTimeUpdate(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current && isActive) {
            onDurationChange(audioRef.current.duration);
        }
    };

    const handleEnded = () => {
        onPlayPause(false);
        const nextIndex = (currentSongIndex + 1) % songs.length;
        onSongChange(nextIndex);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            {/* CD - 훨씬 크게 */}
            <div className="relative cursor-pointer" onClick={togglePlayPause}>
                <div
                    className={`w-[35dvw] h-[35dvw] rounded-full border-4 border-gray-300 bg-[#fff]/10 backdrop-blur-lg flex items-center justify-center transition-transform duration-300 ${
                        globalIsPlaying && isActive ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '3s' }}
                >
                    <img src={currentSong.cover} alt="" />
                </div>
            </div>

            {/* 오디오 엘리먼트 - 활성 CD에만 렌더링 */}
            {isActive && (
                <audio
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                    preload="metadata"
                />
            )}
        </div>
    );
}
