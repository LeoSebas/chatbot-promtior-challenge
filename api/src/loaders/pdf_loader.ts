import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function getPdfFromUrl({ path }: { path: string }) {
  try {
    const loader = new PDFLoader(path);
    const docs = await loader.load();
    return docs
  } catch (error) {
    console.error('Error al cargar el PDF:', error);
    throw new Error('No se pudo cargar el PDF desde la URL proporcionada');
  }
}