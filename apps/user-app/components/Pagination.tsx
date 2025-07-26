'use client'

import { Button } from "@repo/ui/button";
import { useEffect, useMemo, useState } from "react"

type PaginationPropType = {
    items: Array<any>,
    itemsPerPageProp?: number
}

export function usePagination({items, itemsPerPageProp=5}: PaginationPropType) {

    const [currPage, setCurrPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPerPageProp);
    const [pagedItems, setPagedItems] = useState<typeof items>(items.slice((currPage-1)*itemsPerPage , currPage*itemsPerPage+1));
    const itemsLength = items.length;
    const totalPages = useMemo(() => Math.ceil(items.length/itemsPerPage), [items, itemsPerPage] );

    console.log(pagedItems);

    useEffect(()=>{
        setPagedItems(items.slice((currPage-1)*itemsPerPage , currPage*itemsPerPage+1));
    }, [items, itemsPerPage, currPage])

    useEffect(() => {setCurrPage(1)}, [itemsPerPage])

    return {
        pagedItems,
        PaginationControl: () => {
            return <section className="rounded mt-5 flex flex-col-reverse gap-5 p-1 items-center  md:flex-row md:justify-around" 
                // style={{display:'flex', justifyContent:'space-around', alignItems:'center', padding:'1rem'}}
            >
                <div className="flex gap-2 items-center">
                    <select name="itemsPerPage"
                        className="rounded border cursor-pointer border-gray-300 hover:border hover:border-solid hover:border-gray-800"
                        // style={{padding: '0', marginRight:'5px', border: '0.5px solid gray'}}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        value={itemsPerPage}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <p>per page</p>
                </div>
                <div style={{display: 'flex', gap:'1rem', alignItems:'center'}}>
                    <Button category="success" type="button" disabled={currPage===1 ? true : false} onClick={() => {setCurrPage(p => p===1 ? p : p-1)}} >Prev</Button>
                    <p>Page {currPage} of {totalPages}</p>
                    <Button category="success" type="button" disabled={currPage===totalPages ? true : false} onClick={() => {setCurrPage(p => p===totalPages ? p : p+1)}} >Next</Button>
                </div>
            </section>
        }
    }
}