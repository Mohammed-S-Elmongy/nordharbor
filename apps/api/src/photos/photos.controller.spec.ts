import { Test, TestingModule } from "@nestjs/testing";
import { PhotosController } from "./photos.controller.js";
import { PhotosService } from "./photos.service.js";

describe("PhotosController", () => {
  let controller: PhotosController;
  const mockPhotosService = {
    getPhotos: vi.fn().mockReturnValue([]),
    getPhotosByCategory: vi.fn().mockReturnValue([]),
    getPhotoBySlug: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotosController],
      providers: [{ provide: PhotosService, useValue: mockPhotosService }],
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("return all photos when called without a category", () => {
    const result = controller.getPhotos();
    expect(result).toEqual([]);
    expect(mockPhotosService.getPhotos).toHaveBeenCalledOnce();
  });

  it("forwards the category filter to PhotosService", () => {
    const result = controller.getPhotos("wildlife");

    expect(result).toEqual([]);

    expect(mockPhotosService.getPhotosByCategory).toHaveBeenCalledWith(
      "wildlife",
    );

    expect(mockPhotosService.getPhotos).not.toHaveBeenCalled();
  });
});
