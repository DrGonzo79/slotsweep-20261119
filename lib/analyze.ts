export type Episode={id:string;title:string;published:string;downloads90:number;durationMin:number;transcript:string};
export type Finding={episodeId:string;title:string;downloads90:number;markers:string[];confidence:number;estimatedMonthlyValue:number;status:"review"|"approved"};
const patterns=[/promo code\s+[a-z0-9]+/ig,/offer expires?\s+[^.]+/ig,/through\s+(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s+\d{4}/ig,/brought to you by\s+[^.]+/ig,/a word from\s+[^.]+/ig];
export function analyzeEpisode(ep:Episode,cpm:number):Finding|null{
  const markers=[...new Set(patterns.flatMap(p=>ep.transcript.match(p)??[]))];
  if(!markers.length)return null;
  const confidence=Math.min(98,58+markers.length*10);
  const estimatedMonthlyValue=Math.round((ep.downloads90/3/1000)*cpm*100)/100;
  return {episodeId:ep.id,title:ep.title,downloads90:ep.downloads90,markers,confidence,estimatedMonthlyValue,status:"review"};
}
export function analyzeArchive(episodes:Episode[],cpm:number){return episodes.map(e=>analyzeEpisode(e,cpm)).filter((x):x is Finding=>Boolean(x)).sort((a,b)=>b.downloads90-a.downloads90)}
