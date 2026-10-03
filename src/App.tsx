import { useState } from 'react'
import QRCode from 'qrcode'

export default function App(){
  const [text, setText] = useState('')
  const [qrs, setQrs] = useState<string[]>([])

  const generate = async () => {
    if(!text) return
    // QR ko 200 characters me split karenge
    const chunkSize = 200
    const chunks = []
    for(let i=0; i<text.length; i+=chunkSize){
      chunks.push(text.slice(i, i+chunkSize))
    }
    const urls = []
    for(let i=0; i<chunks.length; i++){
      const data = `${i+1}/${chunks.length}|${chunks[i]}`
      const url = await QRCode.toDataURL(data)
      urls.push(url)
    }
    setQrs(urls)
  }

  return (
    <div style={{padding:16, fontFamily:'system-ui', maxWidth:600, margin:'0 auto'}}>
      <h1 style={{textAlign:'center'}}>QR SPLITTER</h1>
      <p style={{textAlign:'center', color:'#666'}}>Bade text ko chhote QR me baanto</p>
      <textarea
        style={{width:'100%', height:120, padding:12, borderRadius:8, border:'1px solid #ccc'}}
        placeholder="Yaha bada text likho..."
        value={text}
        onChange={e=>setText(e.target.value)}
      />
      <button onClick={generate} style={{width:'100%', padding:14, marginTop:12, background:'black', color:'white', borderRadius:10, border:0, fontSize:16}}>
        QR Generate Karo
      </button>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:20}}>
        {qrs.map((qr,i)=>(
          <div key={i} style={{border:'1px solid #eee', padding:8, borderRadius:8, textAlign:'center'}}>
            <img src={qr} style={{width:'100%'}} />
            <small>Part {i+1}/{qrs.length}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
