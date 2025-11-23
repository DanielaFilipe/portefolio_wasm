import React, { useEffect, useRef } from "react";

type WasmExports = {
    memory: WebAssembly.Memory;
    WIDTH: number;
    HEIGHT: number;
    cellsPtr: number;
    init: () => void;
    step: () => void;
};

const WasmGameOfLife: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        let animationId: number | undefined;

        async function initWasm() {
            try {
                // 1. Carregar o binário .wasm
                const res = await fetch("/game-of-life.wasm");
                if (!res.ok) {
                    throw new Error(`Falha ao carregar game-of-life.wasm: ${res.status}`);
                }

                const buffer = await res.arrayBuffer();
                const { instance } = await WebAssembly.instantiate(buffer, {});

                const exports = instance.exports as unknown as WasmExports;
                const { memory, WIDTH, HEIGHT, cellsPtr, init, step } = exports;

                // 2. Inicializar o estado do jogo (lado Wasm)
                init();

                // 3. Preparar canvas / contexto 2D
                const canvas = canvasRef.current;
                if (!canvas) return;

                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                const cellSize = 6;
                canvas.width = WIDTH * cellSize;
                canvas.height = HEIGHT * cellSize;

                // 4. Criar vista da memória partilhada para as células
                const cells = new Uint8Array(memory.buffer, cellsPtr, WIDTH * HEIGHT);

                // 5. Loop de desenho / animação
                const draw = () => {
                    // Avança a simulação no WebAssembly
                    step();

                    // Limpa o canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "#ff3b8a";

                    // Desenha cada célula viva como um quadrado
                    for (let y = 0; y < HEIGHT; y++) {
                        for (let x = 0; x < WIDTH; x++) {
                            const i = y * WIDTH + x;
                            if (cells[i] === 1) {
                                ctx.fillRect(
                                    x * cellSize,
                                    y * cellSize,
                                    cellSize - 1,
                                    cellSize - 1
                                );
                            }
                        }
                    }

                    animationId = requestAnimationFrame(draw);
                };

                draw();
            } catch (e) {
                console.error("Erro ao inicializar Wasm:", e);
            }
        }

        initWasm();

        // cleanup quando o componente desmonta
        return () => {
            if (animationId !== undefined) {
                cancelAnimationFrame(animationId);
            }
        };
    }, []);

    return (
        <div style={{ marginTop: 40, textAlign: "center" }}>
            <h2>High-Performance Demo (WebAssembly)</h2>
            <p style={{ maxWidth: 600, margin: "0 auto 16px", fontSize: 14 }}>
                Simulação do <strong>Conway&apos;s Game of Life</strong> calculada em{" "}
                <strong>WebAssembly</strong> e desenhada num{" "}
                <code>&lt;canvas&gt;</code> com React.
            </p>
            <canvas
                ref={canvasRef}
                style={{
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    background: "#fff",
                }}
            />
        </div>
    );
};

export default WasmGameOfLife;