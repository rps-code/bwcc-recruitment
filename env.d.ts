/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string
	// Define other environment variables here as needed
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
