import { mkdir, readdir, writeFile } from 'node:fs/promises';

const output = new URL('../public/images/articles/', import.meta.url);
const covers = [
  ['comer-antes-de-un-rodaje-largo', 'nutricion', 'Comida previa', 'plate'],
  ['dolor-de-rodilla-cuando-parar', 'salud', 'Rodilla', 'knee'],
  ['dormir-es-entrenamiento', 'salud', 'Recuperación', 'sleep'],
  ['drop-amortiguacion-plantillas', 'material', 'Drop y apoyo', 'shoe'],
  ['empezar-a-correr-en-8-semanas', 'entrenamiento', 'Primeros kilómetros', 'start'],
  ['estirar-antes-o-despues', 'entrenamiento', 'Movilidad', 'stretch'],
  ['fascitis-plantar-senales', 'salud', 'Pie y carga', 'foot'],
  ['hidratacion-en-carreras-populares', 'nutricion', 'Hidratación', 'bottle'],
  ['primera-maraton-plan', 'carreras', '42 kilómetros', 'marathon'],
  ['primera-media-maraton', 'carreras', '21 kilómetros', 'half'],
  ['relojes-metricas-que-sirven', 'material', 'Datos útiles', 'watch'],
  ['series-400-vs-1000', 'entrenamiento', 'Series', 'intervals'],
  ['umbral-sin-laboratorio', 'entrenamiento', 'Umbral', 'gauge'],
  ['zapatillas-900-kilometros', 'material', 'Desgaste', 'tread'],
  ['zona-2-correr-despacio', 'entrenamiento', 'Zona aeróbica', 'zone'],
];

const colors = {
  paper: '#E8EDF0',
  paperDeep: '#D7E0E5',
  ink: '#0E1A20',
  petrol: '#123F52',
  petrolLight: '#1C6275',
  orange: '#F05A28',
  muted: '#51656D',
};

const categoryNames = {
  entrenamiento: 'Entrenamiento',
  material: 'Material',
  nutricion: 'Nutrición',
  salud: 'Salud',
  carreras: 'Carreras',
};

const drawings = {
  plate: `<circle cx="850" cy="350" r="185" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="14"/><circle cx="850" cy="350" r="148" fill="none" stroke="${colors.petrolLight}" stroke-width="8"/><path d="M805 285c40-55 106-24 112 20 8 55-69 95-110 35-14-21-13-37-2-55Z" fill="${colors.orange}"/><path d="M893 406c-28 25-75 35-110 14" fill="none" stroke="${colors.petrol}" stroke-width="14" stroke-linecap="round"/><path d="M640 175v340M610 205h60M610 485h60" stroke="${colors.ink}" stroke-width="10" stroke-linecap="round"/>`,
  knee: `<path d="M735 145c-40 70-38 122 13 175l76 73c28 28 19 69-1 106" fill="none" stroke="${colors.ink}" stroke-width="42" stroke-linecap="round"/><path d="M960 145c40 70 38 122-13 175l-76 73c-28 28-19 69 1 106" fill="none" stroke="${colors.ink}" stroke-width="42" stroke-linecap="round"/><circle cx="850" cy="365" r="63" fill="${colors.orange}" stroke="${colors.paper}" stroke-width="16"/><path d="M850 365c86 0 132 62 132 137" fill="none" stroke="${colors.petrolLight}" stroke-width="14" stroke-dasharray="12 22" stroke-linecap="round"/>`,
  sleep: `<path d="M933 160c-149 30-211 219-93 331 50 48 122 57 186 30-76 100-229 120-330 26-112-105-89-295 47-367 61-33 130-37 190-20Z" fill="${colors.petrol}"/><path d="m1007 188 14 35 37 4-28 24 8 36-31-19-32 19 9-36-29-24 37-4Z" fill="${colors.orange}"/><circle cx="696" cy="250" r="8" fill="${colors.ink}"/><circle cx="1024" cy="452" r="10" fill="${colors.ink}"/><circle cx="715" cy="425" r="5" fill="${colors.petrolLight}"/>`,
  shoe: `<path d="M638 393c56 3 91-32 111-101l25-85c8-27 44-34 61-11l74 101c24 32 80 57 141 72l43 12c39 11 56 39 52 76H628c-36 0-48-59 10-64Z" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="14" stroke-linejoin="round"/><path d="M626 458h503c18 0 30 18 20 34l-16 26H645c-43 0-56-39-19-60Z" fill="${colors.orange}" stroke="${colors.ink}" stroke-width="12"/><path d="m811 232 76 70m-112-25 90 53m-116-6 81 40" stroke="${colors.petrolLight}" stroke-width="12" stroke-linecap="round"/><path d="M921 404h92" stroke="${colors.ink}" stroke-width="10"/>`,
  start: `<path d="M635 479c112-154 201-191 295-105s144 18 240-136" fill="none" stroke="${colors.petrol}" stroke-width="20" stroke-linecap="round" stroke-dasharray="2 28"/><path d="M667 205c85-55 184-31 228 43" fill="none" stroke="${colors.petrolLight}" stroke-width="14" stroke-linecap="round"/><circle cx="1170" cy="218" r="38" fill="${colors.orange}"/><path d="M1154 218h32m-16-16v32" stroke="${colors.paper}" stroke-width="8" stroke-linecap="round"/><path d="M674 496h440" stroke="${colors.ink}" stroke-width="10" stroke-linecap="round"/>`,
  stretch: `<circle cx="855" cy="182" r="46" fill="${colors.orange}"/><path d="M850 235c-13 80-25 140-69 206m69-206c45 51 89 94 162 101m-231 105-75 68m75-68 74 86m157-191 40-98" fill="none" stroke="${colors.ink}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/><path d="M685 173c-72 33-104 89-97 163m439-34c55 41 71 93 46 150" fill="none" stroke="${colors.petrolLight}" stroke-width="10" stroke-dasharray="3 21" stroke-linecap="round"/>`,
  foot: `<path d="M746 142c-32 44-25 123-6 178 18 51-13 111-49 160-22 30-2 70 37 76 51 8 120-15 169-47 72-47 101-119 74-187-14-34-37-77-56-126-16-42-31-85-74-91-37-5-73 10-95 37Z" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="14"/><path d="M730 488c42 18 126 8 190-38" fill="none" stroke="${colors.orange}" stroke-width="30" stroke-linecap="round"/><circle cx="710" cy="132" r="22" fill="${colors.petrolLight}"/><circle cx="762" cy="106" r="24" fill="${colors.petrolLight}"/><circle cx="819" cy="106" r="21" fill="${colors.petrolLight}"/><circle cx="866" cy="127" r="17" fill="${colors.petrolLight}"/>`,
  bottle: `<path d="M800 154h100v63l52 57v205c0 38-29 67-67 67h-70c-38 0-67-29-67-67V274l52-57Z" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="14" stroke-linejoin="round"/><path d="M766 359c61-26 121 28 184-4v124c0 38-29 67-67 67h-70c-38 0-67-29-67-67v-99Z" fill="${colors.petrolLight}"/><path d="M766 359c61-26 121 28 184-4" fill="none" stroke="${colors.orange}" stroke-width="14"/><path d="M958 223c29 37 38 60 16 78-18 15-45 4-47-18-2-18 15-41 31-60Z" fill="${colors.orange}"/>`,
  marathon: `<path d="M640 438c0-178 114-294 260-294s260 116 260 294" fill="none" stroke="${colors.petrol}" stroke-width="18" stroke-linecap="round"/><path d="M692 438c0-139 87-237 208-237s208 98 208 237" fill="none" stroke="${colors.petrolLight}" stroke-width="14" stroke-dasharray="14 18" stroke-linecap="round"/><path d="M760 438c0-91 58-158 140-158s140 67 140 158" fill="none" stroke="${colors.orange}" stroke-width="18" stroke-linecap="round"/><rect x="823" y="352" width="154" height="142" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="12"/><text x="900" y="453" text-anchor="middle" font-family="Arial, sans-serif" font-size="78" font-weight="700" fill="${colors.ink}">42</text>`,
  half: `<path d="M652 480a235 235 0 0 1 470 0" fill="none" stroke="${colors.petrol}" stroke-width="20" stroke-linecap="round"/><path d="M652 480a235 235 0 0 1 236-235" fill="none" stroke="${colors.orange}" stroke-width="20" stroke-linecap="round"/><path d="M888 245v-92m0 0 82 24-82 25" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="12" stroke-linejoin="round"/><circle cx="652" cy="480" r="19" fill="${colors.orange}"/><circle cx="1122" cy="480" r="19" fill="${colors.petrolLight}"/><text x="888" y="435" text-anchor="middle" font-family="Arial, sans-serif" font-size="70" font-weight="700" fill="${colors.ink}">21K</text>`,
  watch: `<rect x="794" y="114" width="112" height="110" rx="24" fill="${colors.petrolLight}"/><rect x="794" y="454" width="112" height="110" rx="24" fill="${colors.petrolLight}"/><rect x="716" y="198" width="268" height="286" rx="66" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="16"/><circle cx="850" cy="337" r="91" fill="none" stroke="${colors.petrol}" stroke-width="12"/><path d="M850 337 850 275m0 62 54 28" stroke="${colors.orange}" stroke-width="16" stroke-linecap="round"/><circle cx="850" cy="337" r="13" fill="${colors.ink}"/><path d="M1008 234h120m-120 61h73m-73 61h137" stroke="${colors.ink}" stroke-width="9" stroke-linecap="round"/>`,
  intervals: `<path d="M638 244c0-70 65-125 144-125h140c81 0 144 57 144 127s-63 127-144 127H782c-79 0-144 55-144 126s65 126 144 126h262" fill="none" stroke="${colors.petrol}" stroke-width="16" stroke-linecap="round"/><path d="M699 244c0-36 36-64 83-64h140c46 0 82 29 82 66s-36 65-82 65H782c-112 0-205 80-205 184 0 103 93 185 205 185" fill="none" stroke="${colors.petrolLight}" stroke-width="9" stroke-dasharray="15 19" stroke-linecap="round"/><circle cx="922" cy="244" r="26" fill="${colors.orange}"/><circle cx="782" cy="498" r="26" fill="${colors.orange}"/>`,
  gauge: `<path d="M650 478a200 200 0 0 1 400 0" fill="none" stroke="${colors.paperDeep}" stroke-width="48" stroke-linecap="round"/><path d="M650 478a200 200 0 0 1 282-188" fill="none" stroke="${colors.petrolLight}" stroke-width="34" stroke-linecap="round"/><path d="M650 478a200 200 0 0 1 199-200" fill="none" stroke="${colors.orange}" stroke-width="34" stroke-linecap="round"/><path d="m850 478 111-156" stroke="${colors.ink}" stroke-width="16" stroke-linecap="round"/><circle cx="850" cy="478" r="32" fill="${colors.ink}"/><path d="M623 520h454" stroke="${colors.ink}" stroke-width="12" stroke-linecap="round"/><text x="850" y="590" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="6" fill="${colors.muted}">CONTROLADO</text>`,
  tread: `<path d="M636 290c128-78 302-119 486-94v230c-175 68-354 80-486 12Z" fill="${colors.paper}" stroke="${colors.ink}" stroke-width="14"/><path d="m648 367 470-88m-465 130 465-91m-452 131 452-90" stroke="${colors.petrolLight}" stroke-width="18" stroke-linecap="round"/><path d="m1010 219 113-19v105l-113 20Z" fill="${colors.orange}"/><path d="M646 480c159 73 332 71 485-6v80c-172 81-350 84-485 6Z" fill="${colors.ink}"/><path d="m684 493 42 10m34 8 38 8m37 5 40 4m41 1 40-3m41-6 39-9" stroke="${colors.paper}" stroke-width="8" stroke-linecap="round"/>`,
  zone: `<circle cx="850" cy="340" r="210" fill="none" stroke="${colors.paperDeep}" stroke-width="38"/><circle cx="850" cy="340" r="158" fill="none" stroke="${colors.petrolLight}" stroke-width="20"/><circle cx="850" cy="340" r="105" fill="none" stroke="${colors.orange}" stroke-width="18"/><path d="M639 345h85l42-73 57 145 50-90 37 18h151" fill="none" stroke="${colors.ink}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/><circle cx="850" cy="340" r="17" fill="${colors.ink}"/>`,
};

function cover([slug, category, label, kind]) {
  const art = drawings[kind];
  if (!art) throw new Error(`No illustration for ${slug}: ${kind}`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-labelledby="title desc">
  <title id="title">${label} — Ruta y Ritmo</title>
  <desc id="desc">Ilustración editorial vectorial sobre ${label.toLowerCase()} en el running.</desc>
  <rect width="1200" height="675" fill="${colors.paper}"/>
  <path d="M0 0h1200v105H0z" fill="${colors.paperDeep}"/>
  <path d="M0 105h1200" stroke="${colors.ink}" stroke-opacity=".22" stroke-width="2"/>
  <text x="88" y="69" fill="${colors.ink}" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="3">RUTA Y RITMO</text>
  <text x="1112" y="68" text-anchor="end" fill="${colors.petrol}" font-family="Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="2">${categoryNames[category].toUpperCase()}</text>
  <path d="M0 565c160-20 248-45 376-27 142 20 213 57 360 46 159-12 276-53 464-34v125H0Z" fill="${colors.paperDeep}"/>
  <path d="M0 602c223-35 367 19 548 3 204-18 344-62 652-28" fill="none" stroke="${colors.petrolLight}" stroke-opacity=".3" stroke-width="3"/>
  <g>${art}</g>
  <path d="M88 620h104" stroke="${colors.orange}" stroke-width="10" stroke-linecap="square"/>
  <text x="214" y="630" fill="${colors.muted}" font-family="Arial, sans-serif" font-size="19" letter-spacing="1">${label.toUpperCase()}</text>
</svg>`;
}

await mkdir(output, { recursive: true });
const articleIds = (await readdir(new URL('../src/content/articulos/', import.meta.url)))
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.slice(0, -3))
  .sort();
const coverIds = covers.map(([slug]) => slug).sort();
if (JSON.stringify(articleIds) !== JSON.stringify(coverIds)) {
  throw new Error('Every article needs exactly one matching cover entry in this script.');
}

for (const item of covers) {
  await writeFile(new URL(`${item[0]}.svg`, output), cover(item));
}
console.log(`Generated ${covers.length} article cover illustrations in public/images/articles/`);
