import { ImageResponse } from "next/og";

export const alt = "Sua Arquiteta — Agni Garcia Arquitetura em Recife";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f9f8f3",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            color: "#6b6560",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          Arquitetura · Interiores · Recife
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: "0.04em",
              color: "#1a1814",
              fontWeight: 600,
              maxWidth: 900,
            }}
          >
            Sua Arquiteta
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              color: "#3d3834",
              maxWidth: 760,
            }}
          >
            Agni Garcia — projetos presenciais em Recife ou remoto para todo o
            Brasil.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 24, color: "#6b6560" }}>
            suaarquiteta.com.br
          </div>
          <div
            style={{
              width: 72,
              height: 4,
              background: "#3d3834",
              borderRadius: 999,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
