import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { s3 } from "./controllers/common";
import { getAllNFTMetadata } from "./controllers/metadata";
import { MetaData, MetaDataI } from "./models/metadata";

dotenv.config();

interface ImageI {
  bg: string;
  god: string;
  trait: string;
  strength: number;
  rarity: string;
}

const RARE_LIMIT = 7;
const STRENGTH_MAX = 100;
const BATCH_SIZE = 100;
const RANDOM_MAX = 10;
const DESCRIPTIONS = [
  "Zeus is the god of the sky and thunder",
  "Zeus is the king of the Greek gods",
];

export const randInt = (num: number) => {
  return Math.floor(Math.random() * num);
};

const generateImage = (): ImageI => {
  const directoryPath = path.join(__dirname, "../images");
  // background
  const rareNum = randInt(RANDOM_MAX);
  let files;
  let bg;
  let rarity;
  if (rareNum < RARE_LIMIT) {
    files = fs.readdirSync(`${directoryPath}/background/normal`);
    bg = files[randInt(files.length)];
    rarity = "normal";
  } else {
    files = fs.readdirSync(`${directoryPath}/background/rare`);
    bg = files[randInt(files.length)];
    rarity = "rare";
  }
  // god
  files = fs.readdirSync(`${directoryPath}/god`);
  let god = files[randInt(files.length)];
  // trait
  files = fs.readdirSync(`${directoryPath}/trait`);
  let trait = files[randInt(files.length)];
  // strength
  const strength = randInt(STRENGTH_MAX + 1);
  // default case
  if (!bg) {
    bg = `${directoryPath}/background/normal/green`;
  }

  if (!god) {
    god = `${directoryPath}/god/zeus`;
  }

  if (!trait) {
    trait = `${directoryPath}/trait/rock`;
  }
  return { bg, god, trait, strength, rarity };
};

const removeExtension = (path: string): string => {
  return path.replace(".png", "");
};

const pathToName = (paths: ImageI): string => {
  const { bg, god, trait, strength } = paths;
  return `${removeExtension(bg)}_${removeExtension(god)}_${removeExtension(trait)}_${strength}`;
};

const randomDescription = (): string => {
  return DESCRIPTIONS[randInt(DESCRIPTIONS.length)] || "";
};

const compileImage = async (paths: ImageI, id: number): Promise<MetaDataI> => {
  const directoryPath = path.join(__dirname, "../images");
  const { bg, god, trait, strength, rarity } = paths;
  const fileName = `${pathToName(paths)}.png`;
  let bgFilePath = `${directoryPath}/background/normal/${bg}`;
  if (rarity === "rare") {
    bgFilePath = `${directoryPath}/background/rare/${bg}`;
  }

  await sharp(bgFilePath)
    .composite([
      { input: `${directoryPath}/god/${god}` },
      { input: `${directoryPath}/trait/${trait}` },
    ])
    .toFile(fileName);

  const filePath = path.resolve(__dirname.replace("/src", ""), `./${fileName}`);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME || "",
    Key: fileName,
    Body: fs.readFileSync(filePath),
    ACL: "public-read",
  };

  s3.upload(uploadParams)
    .promise()
    .then(() => fs.unlinkSync(filePath));

  const metadata: MetaDataI = {
    _id: id,
    name: fileName.replace(".png", ""),
    description: randomDescription(),
    image: `https://${process.env.AWS_BUCKET_NAME}.s3.eu-west-2.amazonaws.com/${fileName}`,
    attributes: [
      { trait_type: "god", value: god },
      { trait_type: "bg", value: bg },
      { trait_type: "trait", value: removeExtension(trait) },
      { trait_type: "strength", value: strength },
      { trait_type: "rarity", value: rarity },
    ],
  };
  return metadata;
};

export const batchGenerate = async () => {
  const metas: MetaDataI[] = await getAllNFTMetadata();
  const id = metas.length;
  const names = new Set(metas.map((meta) => meta.name));
  const imagePaths: ImageI[] = [];
  let count = 0;
  let name;
  let paths;
  // generate 100 unique images
  while (count < BATCH_SIZE) {
    paths = generateImage();
    name = pathToName(paths);
    if (!names.has(name)) {
      imagePaths.push(paths);
      names.add(name);
      count++;
    }
  }
  // generate the image
  const metaData = await Promise.all(
    imagePaths.map((paths, index) => compileImage(paths, id + index))
  );
  await Promise.all(metaData.map((meta) => new MetaData(meta).save()));
};
