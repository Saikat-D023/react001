

function App() {
  
  return (
    <>
      <div style={{backgroundColor: "#dfe6e9", height: "100vh" }}>
        <PostComponent />
        <PostComponent />
        <PostComponent />
      </div>
    </>
  )
}

const style = { width: 200 , backgroundColor: "white", borderRadius: 10, borderColor: "gray", borderWidth: 1, }

function PostComponent(){
  return <div style={{style}}>
   <div  style={{display: "flex"}}>
    <img src={"https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"}
    style={{
      width: 30,
      height: 30,
      borderRadius: 20
    }} alt="" />
    <div style={{fontSize: 10, marginLeft: 10}}>
      <b>
        100xDevs
      </b>
      <div>23,888 followers</div>
      <div>12m</div>
    </div>
    <div style={{fontSize: 12}}>
      What to know to win big? check out these folks who won $6000 in bounties
    </div>
  </div>
  </div>
}


export default App
