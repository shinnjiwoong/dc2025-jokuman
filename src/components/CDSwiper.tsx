'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import CDPlayer from './CDPlayer';

// Swiper CSS import
import 'swiper/css';
import 'swiper/css/pagination';

interface Song {
    id: number;
    title: string;
    artist: string;
    src: string;
    cover: string;
}

interface CDSwiperProps {
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

export default function CDSwiper({
    songs,
    currentSongIndex,
    onSongChange,
    isActive,
    onPlayPause,
    onTimeUpdate,
    onDurationChange,
    globalIsPlaying,
    audioRef,
}: CDSwiperProps) {
    return (
        <div className="w-full h-screen z-[999]">
            <Swiper
                modules={[Pagination]}
                spaceBetween={1100}
                slidesPerView={3}
                centeredSlides={true}
                onSlideChange={(swiper) => onSongChange(swiper.activeIndex)}
                initialSlide={currentSongIndex}
                className="h-full w-full"
                breakpoints={{
                    640: {
                        slidesPerView: 2.5,
                        spaceBetween: -80,
                    },
                    768: {
                        slidesPerView: 2.2,
                        spaceBetween: -60,
                    },
                    1024: {
                        slidesPerView: 2.1,
                        spaceBetween: -40,
                    },
                }}
            >
                {songs.map((song, index) => (
                    <SwiperSlide
                        key={song.id}
                        className="flex items-center justify-center h-full translate-y-[-5%]"
                    >
                        <div
                            className={`w-full h-full flex justify-center transition-transform duration-300 ${
                                index === currentSongIndex
                                    ? 'translate-y-0'
                                    : 'translate-y-0'
                            }`}
                        >
                            <CDPlayer
                                songs={songs}
                                currentSongIndex={index}
                                onSongChange={onSongChange}
                                isActive={index === currentSongIndex}
                                onPlayPause={onPlayPause}
                                onTimeUpdate={onTimeUpdate}
                                onDurationChange={onDurationChange}
                                globalIsPlaying={globalIsPlaying}
                                audioRef={audioRef}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
