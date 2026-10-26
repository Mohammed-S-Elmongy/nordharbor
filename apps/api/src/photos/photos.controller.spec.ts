import { NotFoundException } from "@nestjs/common";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PhotosController } from "./photos.controller.js";
import { PhotosService } from "./photos.service.js";

describe("PhotosController", () => {
  const mockPhotosService = {
    findAll: vi.fn(),
    findAllByCategory: vi.fn(),
    findOneBySlug: vi.fn(),
  };

  const controller = new PhotosController(
    mockPhotosService as unknown as PhotosService,
  );

  beforeEach(() => {
    vi.resetAllMocks();

    mockPhotosService.findAll.mockResolvedValue([]);
    mockPhotosService.findAllByCategory.mockResolvedValue([]);
  });

  it("returns all photos without a category filter", async () => {
    const result = await controller.findAll();

    expect(result).toEqual([]);
    expect(mockPhotosService.findAll).toHaveBeenCalledOnce();
    expect(mockPhotosService.findAllByCategory).not.toHaveBeenCalled();
  });

  it("forwards the category filter to the service", async () => {
    const result = await controller.findAll("wildlife");

    expect(result).toEqual([]);
    expect(mockPhotosService.findAllByCategory).toHaveBeenCalledWith(
      "wildlife",
    );
    expect(mockPhotosService.findAll).not.toHaveBeenCalled();
  });

  it("propagates a missing-photo exception", async () => {
    mockPhotosService.findOneBySlug.mockRejectedValue(
      new NotFoundException("Photo not found"),
    );

    await expect(controller.findOneBySlug("does-not-exist")).rejects.toThrow(
      NotFoundException,
    );

    expect(mockPhotosService.findOneBySlug).toHaveBeenCalledWith(
      "does-not-exist",
    );
  });
});
