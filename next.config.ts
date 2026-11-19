import type {NextConfig} from "next";
const repo="slotsweep-20261119";
const isPages=process.env.PAGES_BUILD==="true";
const config:NextConfig={output:"export",trailingSlash:true,images:{unoptimized:true},allowedDevOrigins:["127.0.0.1"],basePath:isPages?`/${repo}`:"",assetPrefix:isPages?`/${repo}/`:undefined};
export default config;
