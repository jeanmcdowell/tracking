import { mkdir, readdir, rename, stat } from 'node:fs/promises'
import { extname, join, parse } from 'node:path'

/**
 * A simple utility function to add two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
export function sum(a: number, b: number): number {
  return a + b
}

/**
 * A simple utility function to multiply two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The product of a and b
 */
export function multiply(a: number, b: number): number {
  return a * b
}

const categoryByExtension: Record<string, string> = {
  '.jpg': 'Images',
  '.jpeg': 'Images',
  '.png': 'Images',
  '.gif': 'Images',
  '.svg': 'Images',
  '.webp': 'Images',
  '.heic': 'Images',
  '.pdf': 'Documents',
  '.doc': 'Documents',
  '.docx': 'Documents',
  '.txt': 'Documents',
  '.md': 'Documents',
  '.rtf': 'Documents',
  '.xls': 'Spreadsheets',
  '.xlsx': 'Spreadsheets',
  '.csv': 'Spreadsheets',
  '.ppt': 'Presentations',
  '.pptx': 'Presentations',
  '.zip': 'Archives',
  '.rar': 'Archives',
  '.7z': 'Archives',
  '.tar': 'Archives',
  '.gz': 'Archives',
  '.mp3': 'Audio',
  '.wav': 'Audio',
  '.m4a': 'Audio',
  '.flac': 'Audio',
  '.mp4': 'Videos',
  '.mov': 'Videos',
  '.mkv': 'Videos',
  '.avi': 'Videos',
  '.exe': 'Applications',
  '.dmg': 'Applications',
  '.pkg': 'Applications',
  '.msi': 'Applications',
}

export interface OrganizeFolderResult {
  folder: string
  movedFiles: number
  skippedFiles: number
}

export interface OrganizeResult {
  folders: OrganizeFolderResult[]
  totalMoved: number
  totalSkipped: number
}

async function getUniqueFilePath(targetFilePath: string): Promise<string> {
  let candidate = targetFilePath
  let counter = 1

  while (true) {
    try {
      await stat(candidate)
      const parsed = parse(targetFilePath)
      candidate = join(parsed.dir, `${parsed.name} (${counter})${parsed.ext}`)
      counter += 1
    } catch {
      return candidate
    }
  }
}

function getCategoryName(fileName: string): string {
  const extension = extname(fileName).toLowerCase()
  return categoryByExtension[extension] ?? 'Other'
}

export async function organizeFolder(folderPath: string): Promise<OrganizeFolderResult> {
  const entries = await readdir(folderPath)
  let movedFiles = 0
  let skippedFiles = 0

  for (const entry of entries) {
    const sourcePath = join(folderPath, entry)
    const sourceStats = await stat(sourcePath)

    if (!sourceStats.isFile()) {
      skippedFiles += 1
      continue
    }

    const categoryName = getCategoryName(entry)
    const targetDirectoryPath = join(folderPath, categoryName)

    await mkdir(targetDirectoryPath, { recursive: true })

    const targetPath = await getUniqueFilePath(join(targetDirectoryPath, entry))
    await rename(sourcePath, targetPath)
    movedFiles += 1
  }

  return {
    folder: folderPath,
    movedFiles,
    skippedFiles,
  }
}

export async function organizeCommonFolders(basePath: string): Promise<OrganizeResult> {
  const userFolders = ['Downloads', 'Documents', 'Desktop']
  const folders: OrganizeFolderResult[] = []

  for (const folderName of userFolders) {
    const folderPath = join(basePath, folderName)

    try {
      const folderStats = await stat(folderPath)
      if (!folderStats.isDirectory()) {
        continue
      }
    } catch {
      continue
    }

    const result = await organizeFolder(folderPath)
    folders.push(result)
  }

  const totalMoved = folders.reduce((sumValue, result) => sumValue + result.movedFiles, 0)
  const totalSkipped = folders.reduce((sumValue, result) => sumValue + result.skippedFiles, 0)

  return {
    folders,
    totalMoved,
    totalSkipped,
  }
}
