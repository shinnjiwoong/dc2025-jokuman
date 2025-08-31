'use client';

interface Song {
    id: number;
    title: string;
    artist: string;
    src: string;
}

interface PlayBarProps {
    currentSong: Song;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    onPlayPause: () => void;
}

export default function PlayBar({
    currentSong,
    isPlaying,
    currentTime,
    duration,
    onPlayPause,
}: PlayBarProps) {
    const formatTime = (time: number) => {
        return `${Math.floor(time / 60)}:${(time % 60)
            .toFixed(0)
            .padStart(2, '0')}`;
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-transparent p-4 z-50">
            <div className="mx-auto flex flex-col items-center space-x-4 w-full gap-[16px]">
                {/* 곡 정보 */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[24px] truncate mb-[8px]">
                        {currentSong.title}
                    </h3>
                </div>

                {/* 진행바 */}
                <div className="flex-1 min-w-0 w-[50%]">
                    <div className="w-full bg-black h-2">
                        <div
                            className="bg-[#595757] h-2 transition-all duration-100"
                            style={{
                                width: `${
                                    duration
                                        ? (currentTime / duration) * 100
                                        : 0
                                }%`,
                            }}
                        ></div>
                    </div>
                </div>

                {/* 재생 컨트롤 */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onPlayPause}
                        className=" text-white flex items-center justify-center translate-x-[-25%]"
                    >
                        {isPlaying ? (
                            <img
                                src="/pause.svg"
                                alt=""
                                className="w-10 h-10"
                            />
                        ) : (
                            <img src="/play.svg" alt="" className="w-10 h-10" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
