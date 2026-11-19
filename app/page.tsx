"use client";
import {useMemo,useState} from "react";
import data from "@/data/demo.json";
import {analyzeArchive,Episode,Finding} from "@/lib/analyze";

type Screen="setup"|"results";
export default function Home(){
  const [screen,setScreen]=useState<Screen>("setup");
  const [cpm,setCpm]=useState(24);
  const [selected,setSelected]=useState<string[]>(data.episodes.map(e=>e.id));
  const [findings,setFindings]=useState<Finding[]>([]);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const [detail,setDetail]=useState<Finding|null>(null);
  const episodes=data.episodes as Episode[];
  const chosen=useMemo(()=>episodes.filter(e=>selected.includes(e.id)),[selected,episodes]);
  function toggle(id:string){setSelected(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);setError("")}
  function scan(){if(!selected.length){setError("Choose at least one episode to scan.");return}if(cpm<1||cpm>200){setError("CPM must be between $1 and $200.");return}setLoading(true);setError("");setTimeout(()=>{setFindings(analyzeArchive(chosen,cpm));setLoading(false);setScreen("results")},450)}
  function approve(id:string){setFindings(fs=>fs.map(f=>f.episodeId===id?{...f,status:f.status==="approved"?"review":"approved"}:f))}
  const value=findings.reduce((n,f)=>n+f.estimatedMonthlyValue,0);
  return <main>
    <header><a className="brand" href="#top" aria-label="SlotSweep home"><span>◉</span> SlotSweep</a><div className="demo">FICTIONAL DEMO · NO AUDIO UPLOADED</div></header>
    <section className="hero" id="top"><div><p className="eyebrow">ARCHIVE REVENUE OPS</p><h1>Find the sponsor reads<br/>that aged badly.</h1><p className="lede">Turn a public podcast archive into an approval-ready cleanup queue—ranked by current replay traffic, not episode age.</p></div><div className="signal"><span>DEMO ARCHIVE</span><strong>3 episodes</strong><small>4,050 downloads · last 90 days</small></div></section>
    {screen==="setup"?<section className="workspace" aria-labelledby="setup-title">
      <div className="step"><span>01</span><div><h2 id="setup-title">Choose the archive slice</h2><p>Shared fictional fixtures model a public RSS scan. Select what the operator should inspect first.</p></div></div>
      <div className="episodeList">{episodes.map(ep=><label className={`episode ${selected.includes(ep.id)?"selected":""}`} key={ep.id}><input type="checkbox" checked={selected.includes(ep.id)} onChange={()=>toggle(ep.id)}/><span className="check" aria-hidden="true">✓</span><span className="episodeMain"><strong>{ep.title}</strong><small>{ep.published} · {ep.durationMin} min</small></span><span className="traffic">{ep.downloads90.toLocaleString()}<small>90d plays</small></span></label>)}</div>
      <div className="controls"><label>Assumed sellable CPM <span>${cpm}</span><input aria-label="Assumed sellable CPM" type="range" min="1" max="80" value={cpm} onChange={e=>setCpm(Number(e.target.value))}/></label><button onClick={scan} disabled={loading}>{loading?"Scanning archive…":`Scan ${selected.length} episode${selected.length===1?"":"s"}`}</button></div>
      {error&&<p className="error" role="alert">{error}</p>}<p className="fineprint">Heuristics flag date language, promo codes and sponsor phrases. A human must verify every segment.</p>
    </section>:<section className="workspace results" aria-live="polite">
      <div className="resultsHead"><div><p className="eyebrow">LEAK REPORT · DEMO</p><h2>{findings.length} stale-read candidates</h2><p>Prioritized by recent downloads. Confidence is heuristic, not transcription certainty.</p></div><div className="value"><small>EST. MONTHLY SLOT VALUE</small><strong>${value.toFixed(2)}</strong><span>at ${cpm} CPM</span></div></div>
      <div className="meter"><span style={{width:`${Math.min(100,findings.length/selected.length*100)}%`}}/></div>
      {findings.length===0?<div className="empty"><strong>No candidates found.</strong><p>That is a useful result: send this slice to manual QA before expanding the scan.</p></div>:<div className="queue">{findings.map((f,i)=><article className={f.status==="approved"?"approved":""} key={f.episodeId}><div className="rank">0{i+1}</div><button className="finding" onClick={()=>setDetail(f)} aria-label={`View evidence for ${f.title}`}><strong>{f.title}</strong><span>{f.markers[0]}</span><small>{f.confidence}% heuristic confidence · {f.downloads90.toLocaleString()} recent plays</small></button><div className="actions"><b>${f.estimatedMonthlyValue.toFixed(2)}<small>/mo</small></b><button onClick={()=>approve(f.episodeId)}>{f.status==="approved"?"Undo approval":"Approve slot"}</button></div></article>)}</div>}
      <button className="secondary" onClick={()=>setScreen("setup")}>← Adjust scan</button>
    </section>}
    <section className="how"><p className="eyebrow">THE HUMAN-IN-THE-LOOP WEDGE</p><div><article><span>01</span><h3>Scan public RSS</h3><p>Transcribe and flag likely stale reads without host credentials.</p></article><article><span>02</span><h3>Owner approves</h3><p>Show evidence and traffic before any destructive edit.</p></article><article><span>03</span><h3>Execute in host</h3><p>Use the podcast host's existing DAI controls, then QA the feed.</p></article></div></section>
    <footer>SlotSweep prototype · Fictional data · Frontend-only Pages demo · Python analysis API included in source</footer>
    {detail&&<div className="backdrop" role="presentation" onMouseDown={()=>setDetail(null)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={e=>e.stopPropagation()}><button className="close" aria-label="Close details" onClick={()=>setDetail(null)}>×</button><p className="eyebrow">EVIDENCE PACKET · FICTIONAL</p><h2 id="modal-title">{detail.title}</h2><p className="quote">“{episodes.find(e=>e.id===detail.episodeId)?.transcript}”</p><h3>Detected markers</h3><ul>{detail.markers.map(m=><li key={m}>{m}</li>)}</ul><p className="warning">No timestamp or edit is production-ready until a human listens to the original audio.</p></div></div>}
  </main>
}
