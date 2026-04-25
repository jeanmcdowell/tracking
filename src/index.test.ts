import { mkdtemp, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { multiply, organizeCommonFolders, organizeFolder, sum } from './index'

const temporaryFolders: string[] = []

afterEach(async () => {
  await Promise.all(temporaryFolders.map(folderPath => rm(folderPath, { recursive: true, force: true })))
  temporaryFolders.length = 0
})

describe('Utility Functions', () => {
  describe('sum', () => {
    it('should add two positive numbers correctly', () => {
      expect(sum(2, 3)).toBe(5)
      expect(sum(10, 15)).toBe(25)
    })

    it('should handle negative numbers', () => {
      expect(sum(-1, -2)).toBe(-3)
      expect(sum(-5, 10)).toBe(5)
    })

    it('should handle zero', () => {
      expect(sum(0, 0)).toBe(0)
      expect(sum(5, 0)).toBe(5)
      expect(sum(0, -3)).toBe(-3)
    })
  })

  describe('multiply', () => {
    it('should multiply two positive numbers correctly', () => {
      expect(multiply(3, 4)).toBe(12)
      expect(multiply(7, 8)).toBe(56)
    })

    it('should handle negative numbers', () => {
      expect(multiply(-2, 3)).toBe(-6)
      expect(multiply(-4, -5)).toBe(20)
    })

    it('should handle zero', () => {
      expect(multiply(0, 5)).toBe(0)
      expect(multiply(7, 0)).toBe(0)
    })
  })

  describe('organizeFolder', () => {
    it('moves files into categorized folders and skips directories', async () => {
      const workingFolder = await mkdtemp(join(tmpdir(), 'organize-folder-'))
      temporaryFolders.push(workingFolder)

      await writeFile(join(workingFolder, 'photo.jpg'), 'x')
      await writeFile(join(workingFolder, 'notes.txt'), 'x')
      await writeFile(join(workingFolder, 'archive.zip'), 'x')
      await mkdir(join(workingFolder, 'keep-folder'))

      const result = await organizeFolder(workingFolder)

      expect(result.movedFiles).toBe(3)
      expect(result.skippedFiles).toBe(1)

      const imageStats = await stat(join(workingFolder, 'Images', 'photo.jpg'))
      const documentStats = await stat(join(workingFolder, 'Documents', 'notes.txt'))
      const archiveStats = await stat(join(workingFolder, 'Archives', 'archive.zip'))

      expect(imageStats.isFile()).toBe(true)
      expect(documentStats.isFile()).toBe(true)
      expect(archiveStats.isFile()).toBe(true)
    })

    it('renames files when destination name already exists', async () => {
      const workingFolder = await mkdtemp(join(tmpdir(), 'organize-collision-'))
      temporaryFolders.push(workingFolder)

      await mkdir(join(workingFolder, 'Documents'), { recursive: true })
      await writeFile(join(workingFolder, 'Documents', 'notes.txt'), 'existing')
      await writeFile(join(workingFolder, 'notes.txt'), 'incoming')

      await organizeFolder(workingFolder)

      const files = await readdir(join(workingFolder, 'Documents'))
      expect(files.sort()).toEqual(['notes (1).txt', 'notes.txt'])
    })
  })

  describe('organizeCommonFolders', () => {
    it('organizes Downloads, Documents, and Desktop folders when present', async () => {
      const homeFolder = await mkdtemp(join(tmpdir(), 'organize-home-'))
      temporaryFolders.push(homeFolder)

      await mkdir(join(homeFolder, 'Downloads'))
      await mkdir(join(homeFolder, 'Desktop'))

      await writeFile(join(homeFolder, 'Downloads', 'song.mp3'), 'x')
      await writeFile(join(homeFolder, 'Desktop', 'movie.mp4'), 'x')

      const result = await organizeCommonFolders(homeFolder)

      expect(result.totalMoved).toBe(2)
      expect(result.folders).toHaveLength(2)
      await expect(stat(join(homeFolder, 'Downloads', 'Audio', 'song.mp3'))).resolves.toBeTruthy()
      await expect(stat(join(homeFolder, 'Desktop', 'Videos', 'movie.mp4'))).resolves.toBeTruthy()
    })
  })
})
