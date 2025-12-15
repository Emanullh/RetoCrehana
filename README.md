# 🌍 RetoCrehana - Countries Explorer

Aplicación móvil desarrollada en **React Native** que muestra información de países del mundo y permite reproducir contenido de video en streaming HLS.

## 📱 Características

### Pantalla de Listado de Países

- ✅ Barra de búsqueda para filtrar países por nombre
- ✅ Filtro por continente mediante selector/dropdown
- ✅ Filtro por moneda (currency)
- ✅ Cada ítem muestra: nombre del país, código, continente y emoji

### Pantalla de Detalle de País

- ✅ Código del país
- ✅ Nombre (nativo e internacional)
- ✅ Capital
- ✅ Continente
- ✅ Moneda
- ✅ Idiomas
- ✅ Reproductor de video HLS con controles nativos

### Características Técnicas

- ✅ React Native con TypeScript (modo estricto)
- ✅ GraphQL con Apollo Client para consumo de API
- ✅ Navegación con Expo Router
- ✅ UI Components con NativeWind (TailwindCSS)
- ✅ FlashList para listas optimizadas
- ✅ Reproductor HLS con expo-video

## 🛠️ Stack Tecnológico

| Tecnología    | Versión | Propósito               |
| ------------- | ------- | ----------------------- |
| Expo SDK      | 54      | Framework de desarrollo |
| TypeScript    | 5.9     | Tipado estático         |
| Apollo Client | 3.x     | Cliente GraphQL         |
| NativeWind    | 4.x     | Estilos (TailwindCSS)   |
| Expo Router   | 6.x     | Navegación file-based   |
| FlashList     | latest  | Listas optimizadas      |
| expo-video    | latest  | Reproducción HLS        |

## 📦 Instalación

### Prerrequisitos

- Node.js >= 18.x
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) o Android Emulator

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/Emanullh/RetoCrehana.git
cd RetoCrehana
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar el servidor de desarrollo**

```bash
npm start
```

4. **Ejecutar en dispositivo/simulador**

```bash
# iOS
npm run ios

# Android
npm run android
```

## 🚀 Scripts disponibles

```bash
npm start         # Inicia Expo en modo desarrollo
npm run ios       # Ejecuta en simulador iOS
npm run android   # Ejecuta en emulador Android
npm run web       # Ejecuta en navegador web
npm run lint      # Ejecuta ESLint
```

## 📁 Estructura del Proyecto

```
RetoCrehana/
├── app/                          # Pantallas (Expo Router)
│   ├── _layout.tsx              # Layout principal
│   ├── index.tsx                # Pantalla de listado
│   └── country/
│       └── [code].tsx           # Pantalla de detalle
├── components/
│   └── ui/                      # Componentes UI reutilizables
│       ├── Card.tsx
│       ├── SearchInput.tsx
│       ├── FilterDropdown.tsx
│       ├── LoadingSpinner.tsx
│       ├── ErrorView.tsx
│       └── EmptyState.tsx
├── features/                    # Módulos por característica
│   ├── countries/
│   │   ├── components/          # Componentes de países
│   │   │   ├── CountryCard.tsx
│   │   │   ├── CountryList.tsx
│   │   │   └── FilterBar.tsx
│   │   └── hooks/               # Lógica de países
│   │       ├── useCountries.ts
│   │       └── useCountryDetails.ts
│   └── video-player/
│       └── components/
│           └── HLSPlayer.tsx    # Reproductor HLS
├── lib/                         # Configuración y utilidades
│   ├── apollo.ts                # Cliente Apollo
│   └── graphql/
│       ├── queries.ts           # Queries GraphQL
│       └── types.ts             # Tipos TypeScript
└── hooks/                       # Hooks compartidos
```

## 🔗 APIs Utilizadas

### GraphQL - Países

- **Endpoint**: https://countries.trevorblades.com/graphql
- **Documentación**: https://github.com/trevorblades/countries

### Video HLS

- **Fuente de demostración**: Mux Test Streams
- **URL**: https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8

## 🎨 Diseño y UX

- **Tema claro/oscuro** adaptativo según preferencias del sistema
- **Filtrado en tiempo real** con debounce de 300ms
- **Estados de carga** con spinners informativos
- **Manejo de errores** con opciones de reintento
- **Accesibilidad** con labels y roles apropiados
- **Animaciones sutiles** en interacciones táctiles

## 📋 Arquitectura

La aplicación sigue una **arquitectura basada en características** (Feature-Based Architecture):

1. **Capa de Presentación** (`app/`): Pantallas con Expo Router
2. **Capa de Features** (`features/`): Lógica y componentes por dominio
3. **Capa Compartida** (`components/`, `lib/`): Recursos reutilizables

### Patrones utilizados

- **Custom Hooks**: Separación de lógica y presentación
- **Apollo Client**: Gestión de estado con caché normalizada
- **Container/Presentational**: Componentes inteligentes vs. de presentación
