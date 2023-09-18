

const success_response_with_data = (res,msg,data)=>{
    return res.status(200).json({
        status:"success",
        msg:msg,
        data:data
    })
}

const success_response_without_data = (res)=>{
    return res.status(200).json({
        status:"success"
    })
}

const error_response_without_data = (res)=>{
    return res.status(400).json({
        status:"error"
    })
}

const error_response_with_data = (res,msg,data)=>{
    return res.status(400).json({
        status:"error",
        msg:msg,
        data:data
    })
}

const internal_server_error = (res,msg,data)=>{
    return res.status(500).json({
        status:"error",
        msg:msg,
        data:data
    })
}