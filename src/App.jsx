import { useEffect, useState } from "react"
import "../src/App.css";
function App() {

  const [product, setProduct] = useState([])
  const [page, setPage] = useState([]);
  const [pagePointer, setPagePointer] = useState(1);
  const[leftPointer,setLeftPointer]=useState(false);
  const[rightPointer,setRightPointer]=useState(true);

  useEffect(() => {
    fetchApi()
  }, [])

  useEffect(() => {
    if (product.length != 0) {
      setPage(Array.from({ length: product.length / 10 }, (_, id) => id + 1));
    }
  }, [product])

  useEffect(()=>{
    ((pagePointer!=1)?
      setLeftPointer(true):setLeftPointer(false));
      
      ((pagePointer!=product.length/10)?
      setRightPointer(true):setRightPointer(false));
  },[pagePointer,product.length])

  const fetchApi = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100", {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      });
      const data = await res.json();
      setProduct(data.products);
    } catch (error) {
      console.log("error---" + error)
    }

  }

  const handlePointer = (pg) => {
    setPagePointer(pg);
  }

  const handleLeftPointer = () => {

    if (pagePointer != 1)
      setPagePointer(pagePointer => pagePointer - 1)
  }

  const handleRightPointer = () => {

    if (pagePointer != product.length / 10)
      setPagePointer(pagePointer => pagePointer + 1)
  }

  return (
    <>
      {product.length != 0 ?
        (<>
          <div className="container">
            {product.slice((pagePointer * 10) - 10, pagePointer * (product.length / 10)).map((item) => {
              return (
                <div key={item.id}>
                  <img src={item.thumbnail} alt={item.title} />
                  <p>{item.title}</p>
                </div>)
            })
            }
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {leftPointer&&<span style={{ cursor: "pointer", padding: "5px" }} onClick={() => handleLeftPointer()} className="left__pointer">⬅️</span>}
            {
              page.map((pg) => {
                return (
                  <span key={pg} style={{ padding: "5px", border: "1px solid black", fontSize: 15, cursor: "pointer" }} onClick={() => handlePointer(pg)}>{pg}</span>
                )
              })
            }
            {rightPointer&&<span style={{ cursor: "pointer", padding: "5px" }} onClick={() => handleRightPointer()} className="right__pointer">➡️</span>}
          </div>
        </>) : (<h1>Loading....</h1>)}
    </>
  )
}

export default App
