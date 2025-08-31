'use client';

import { useState, useRef } from 'react';
import CDSwiper from '@/components/CDSwiper';
import PlayBar from '@/components/PlayBar';

interface Song {
    id: number;
    title: string;
    artist: string;
    src: string;
    cover: string;
}

// 샘플 곡 데이터 (실제 음악 파일로 교체하세요)
const songs: Song[] = [
    {
        id: 1,
        title: '조쿠마',
        artist: '아티스트 1',
        src: '/music/song1.mp3',
        cover: '/1_title.png',
    },
    {
        id: 2,
        title: '빠레뜨',
        artist: '아티스트 2',
        src: '/music/song2.mp3',
        cover: '/2.png',
    },
    {
        id: 3,
        title: '얼라랑 내 바다',
        artist: '아티스트 3',
        src: '/music/song3.mp3',
        cover: '/3.png',
    },
    {
        id: 4,
        title: '내만 몰랐다 아이가',
        artist: '아티스트 4',
        src: '/music/song4.mp3',
        cover: '/4.png',
    },
    {
        id: 5,
        title: '밤중에 니 줄라고 쓴기다',
        artist: '아티스트 5',
        src: '/music/song5.mp3',
        cover: '/5.png',
    },
    {
        id: 6,
        title: '니랑 내',
        artist: '아티스트 6',
        src: '/music/song6.mp3',
        cover: '/6.png',
    },
];

export default function Home() {
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleSongChange = (index: number) => {
        setCurrentSongIndex(index);
        setIsPlaying(false); // 곡 변경 시 자동으로 정지
    };

    const handlePlayPause = (playing: boolean) => {
        setIsPlaying(playing);
    };

    const handleTimeUpdate = (time: number) => {
        setCurrentTime(time);
    };

    const handleDurationChange = (dur: number) => {
        setDuration(dur);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    // const handleTrackClick = (index: number) => {
    //     setCurrentSongIndex(index);
    //     setIsPlaying(true); // 트랙 클릭 시 자동으로 재생
    // };

    return (
        <div className="h-screen w-full bg-[#383636] overflow-hidden">
            <div className="grid grid-cols-1 gap-[16px] fixed top-[16px] left-[16px] right-[16px]">
                <img src="/logo.svg" alt="" className="w-full" />
                {/* <div>
                    {songs.map((song, index) => (
                        <p
                            key={song.id}
                            className={`text-[24px] text-white font-bold cursor-pointer hover:text-gray-300 transition-colors ${
                                index === currentSongIndex
                                    ? 'text-blue-400'
                                    : ''
                            }`}
                            onClick={() => handleTrackClick(index)}
                        >
                            {index + 1}. {song.title}
                        </p>
                    ))}
                </div> */}
            </div>

            <CDSwiper
                songs={songs}
                currentSongIndex={currentSongIndex}
                onSongChange={handleSongChange}
                isActive={true}
                onPlayPause={handlePlayPause}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
                globalIsPlaying={isPlaying}
                audioRef={audioRef}
            />
            <PlayBar
                currentSong={songs[currentSongIndex]}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                onPlayPause={togglePlayPause}
            />
        </div>
    );
}
