/**
 * Avatar pixel-art desenhado em SVG (sem imagens externas).
 * Cada carreira tem paleta, chapéu e item próprios.
 * Grid lógico de 40x52 células, cada célula com P pixels.
 */
export interface AvatarSpec {
  cloth: string;
  clothDark: string;
  accent: string;
  hair: string;
  skin: string;
  hat: "hood" | "crown" | "cap" | "wizard" | "beret" | "graduacao" | "none";
  item: "brush" | "lupa" | "controle" | "estandarte" | "pergaminho" | "moedas" | "orbe" | "livro";
  label: string;
}

const P = 6;
const W = 40 * P;
const H = 52 * P;

export default function PixelAvatar({ spec }: { spec: AvatarSpec }) {
  const { cloth, clothDark, accent, hair, skin, hat, item } = spec;
  const px = (x: number, y: number, w: number, h: number, fill: string, key?: string) => (
    <rect key={key} x={x * P} y={y * P} width={w * P} height={h * P} fill={fill} />
  );

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" shapeRendering="crispEdges" aria-hidden="true">
      {/* sombra + plataforma isométrica */}
      <ellipse cx={20 * P} cy={46 * P} rx={13 * P} ry={3.2 * P} fill="#00000022" />
      <polygon points={`${20 * P},${40 * P} ${34 * P},${45 * P} ${20 * P},${50 * P} ${6 * P},${45 * P}`} fill="#b08a52" />
      <polygon points={`${6 * P},${45 * P} ${20 * P},${50 * P} ${20 * P},${52 * P} ${6 * P},${47 * P}`} fill="#8a6a3a" />
      <polygon points={`${34 * P},${45 * P} ${20 * P},${50 * P} ${20 * P},${52 * P} ${34 * P},${47 * P}`} fill="#9c7842" />

      {/* pernas */}
      {px(15, 33, 4, 7, clothDark, "l")}
      {px(21, 33, 4, 7, clothDark, "r")}
      {px(14, 39, 5, 2, "#3a2a20", "bootL")}
      {px(21, 39, 5, 2, "#3a2a20", "bootR")}

      {/* tronco */}
      {px(14, 22, 12, 12, cloth, "torso")}
      {px(14, 30, 12, 4, clothDark, "belt")}
      {px(18, 30, 4, 4, accent, "buckle")}

      {/* braços */}
      {px(11, 23, 3, 9, cloth, "armL")}
      {px(26, 23, 3, 9, cloth, "armR")}
      {px(11, 31, 3, 2, skin, "handL")}
      {px(26, 31, 3, 2, skin, "handR")}

      {/* cabeça */}
      {px(15, 12, 10, 10, skin, "head")}
      {px(15, 12, 10, 3, hair, "hairTop")}
      {px(14, 13, 1, 6, hair, "hairL")}
      {px(25, 13, 1, 6, hair, "hairR")}
      {px(17, 17, 2, 2, "#241a12", "eyeL")}
      {px(21, 17, 2, 2, "#241a12", "eyeR")}
      {px(18, 20, 4, 1, "#c07858", "mouth")}

      {/* chapéus */}
      {hat === "hood" && (
        <>
          {px(13, 10, 14, 4, cloth, "hoodTop")}
          {px(12, 12, 3, 9, cloth, "hoodL")}
          {px(25, 12, 3, 9, cloth, "hoodR")}
          {px(13, 8, 14, 2, clothDark, "hoodTip")}
        </>
      )}
      {hat === "cap" && (
        <>
          {px(14, 9, 12, 3, accent, "capTop")}
          {px(13, 12, 14, 1, clothDark, "capBrim")}
        </>
      )}
      {hat === "crown" && (
        <>
          {px(14, 9, 12, 2, "#f8d830", "crownBase")}
          {px(14, 7, 2, 2, "#f8d830", "spike1")}
          {px(19, 6, 2, 3, "#f8d830", "spike2")}
          {px(24, 7, 2, 2, "#f8d830", "spike3")}
          {px(19, 8, 2, 2, "#e04040", "gem")}
        </>
      )}
      {hat === "wizard" && (
        <>
          {px(12, 11, 16, 2, clothDark, "brim")}
          <polygon points={`${20 * P},${1 * P} ${26 * P},${11 * P} ${14 * P},${11 * P}`} fill={cloth} />
          {px(18, 4, 4, 2, accent, "star")}
        </>
      )}
      {hat === "beret" && (
        <>
          {px(13, 9, 14, 3, clothDark, "beret")}
          {px(22, 7, 3, 2, accent, "pompom")}
        </>
      )}
      {hat === "graduacao" && (
        <>
          <polygon points={`${20 * P},${7 * P} ${30 * P},${11 * P} ${20 * P},${15 * P} ${10 * P},${11 * P}`} fill="#2a2a34" />
          {px(28, 11, 6, 1, accent, "tassel")}
        </>
      )}

      {/* itens na mão */}
      {item === "brush" && (
        <>
          {px(28, 18, 2, 14, "#8a5a2a", "brushHandle")}
          {px(27, 15, 4, 4, accent, "brushTip")}
        </>
      )}
      {item === "lupa" && (
        <>
          {px(27, 15, 6, 6, "#bfe8f0", "glass")}
          {px(28, 16, 4, 4, "#e8ffff", "glassIn")}
          {px(29, 21, 2, 6, "#6a4a2a", "lupaHandle")}
        </>
      )}
      {item === "controle" && (
        <>
          {px(25, 28, 9, 5, "#2a2a34", "pad")}
          {px(26, 29, 2, 2, accent, "btn1")}
          {px(30, 29, 2, 2, "#e04040", "btn2")}
        </>
      )}
      {item === "estandarte" && (
        <>
          {px(29, 8, 1, 26, "#6a4a2a", "mast")}
          <polygon points={`${30 * P},${9 * P} ${38 * P},${11 * P} ${30 * P},${17 * P}`} fill={accent} />
        </>
      )}
      {item === "pergaminho" && (
        <>
          {px(26, 24, 9, 7, "#f0e4c0", "scroll")}
          {px(25, 23, 2, 9, "#c8a860", "rollL")}
          {px(34, 23, 2, 9, "#c8a860", "rollR")}
          {px(28, 26, 5, 1, "#8a7a5a", "line1")}
          {px(28, 28, 5, 1, "#8a7a5a", "line2")}
        </>
      )}
      {item === "moedas" && (
        <>
          {px(26, 30, 8, 5, "#8a6a3a", "bag")}
          {px(27, 28, 6, 2, "#f8d830", "coins")}
        </>
      )}
      {item === "orbe" && (
        <>
          <circle cx={30 * P} cy={19 * P} r={4 * P} fill={accent} opacity="0.9" />
          <circle cx={29 * P} cy={18 * P} r={1.6 * P} fill="#ffffff" />
          {px(29, 23, 2, 5, clothDark, "staff")}
        </>
      )}
      {item === "livro" && (
        <>
          {px(25, 26, 10, 7, clothDark, "capa")}
          {px(26, 27, 8, 5, "#f0e4c0", "paginas")}
          {px(29, 25, 2, 9, accent, "marcador")}
        </>
      )}
    </svg>
  );
}
