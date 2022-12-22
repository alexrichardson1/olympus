import { NextFunction, Request, Response } from "express";
import { requestNFTMetadata } from "../../controllers/metadata";

let mockRes: Response;
let mockNext: NextFunction;

describe("Metadata", function () {
  beforeEach(function () {
    mockRes = {
      status: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;
    mockNext = jest.fn();
  });

  afterEach(function () {
    jest.clearAllMocks();
  });

  describe("token Metadata", function () {
    it("should error if called with undefined parameters", async function () {
      const mockReq = {
        params: {},
      } as unknown as Request;
      await requestNFTMetadata(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new Error("Invalid parameters"));
    });

    it("should error if collection does not exist in db", async function () {
      const mockReq = {
        params: {
          tokenId: -1,
        },
      } as unknown as Request;
      await requestNFTMetadata(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalledWith(new Error("Invalid token id"));
    });
  });
});
