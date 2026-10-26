import { NotFoundException } from "@nestjs/common";
import { describe, expect, it, vi } from "vitest";
import { PhotosService } from "./photos.service.js";

describe("PhotosService", () => {
  it("returns an empty array when no photos match a category", async () => {
    const where = vi.fn().mockResolvedValue([]);

    const query = {
      from: vi.fn().mockReturnThis(),
      innerJoin: vi.fn().mockReturnThis(),
      where,
    };

    const db = {
      select: vi.fn().mockReturnValue(query),
    };

    const service = new PhotosService(
      db as unknown as ConstructorParameters<typeof PhotosService>[0],
    );

    const result = await service.findAllByCategory("unknown");

    expect(result).toEqual([]);
    expect(where).toHaveBeenCalledOnce();
  });

  it("returns all photos when the category is 'all'", async () => {
    const service = new PhotosService(
      {} as ConstructorParameters<typeof PhotosService>[0],
    );

    const findAll = vi.spyOn(service, "findAll").mockResolvedValue([]);

    const result = await service.findAllByCategory(" ALL ");

    expect(result).toEqual([]);
    expect(findAll).toHaveBeenCalledOnce();
  });

  it("throws NotFoundException for an unknown photo slug", async () => {
    const limit = vi.fn().mockResolvedValue([]);

    const query = {
      from: vi.fn().mockReturnThis(),
      innerJoin: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnValue({ limit }),
    };

    const db = {
      select: vi.fn().mockReturnValue(query),
    };

    const service = new PhotosService(
      db as unknown as ConstructorParameters<typeof PhotosService>[0],
    );

    await expect(service.findOneBySlug("does-not-exist")).rejects.toThrow(
      NotFoundException,
    );

    expect(limit).toHaveBeenCalledWith(1);
  });
});

