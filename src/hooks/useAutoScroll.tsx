import React, { useEffect, useRef } from "react";

export const useAutoScroll = (deps: React.DependencyList) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const atBottom = useRef(false);

    useEffect(() => {
        if(ref.current && atBottom.current) {
            ref.current?.scrollTo({ top: ref.current?.scrollHeight });
        }
    }, deps);

    useEffect(() => {
        if(!ref.current) return;

        const onScroll = () => {
            if(!ref.current) return;
            atBottom.current = Math.abs(ref.current.scrollHeight - ref.current.clientHeight - ref.current.scrollTop) <= 1;
        };

        ref.current.addEventListener("scroll", onScroll);

        return () => {
            ref.current?.removeEventListener("scroll", onScroll);
        };
    }, [ref, ...deps]);

    return ref;
};
