import axios from "axios";
import React, { useState } from "react";
import { GlobalContext } from "./GlobalContext";

const GlobalState = (props) => {
    const [selectedPost, setSelectedPost] = useState([])
    const [loading, setLoading] = useState(false)
    

    return(
        <GlobalContext.Provider value={{selectedPost, setSelectedPost, loading, setLoading}}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalState