import React, { useState } from "react";

export default function SearchCoin() {

  const [posts, setPosts] = useState({
    bairro: '---',
    cidade: '---',
    logradouro: '---',
    estado_info: {
      nome: '---',
      area_km2: '---',
      codigo_ibge: '---'
    },
    cep: '---',
  });

  const [cep, setCep] = useState()
  const [err, setErr] = useState()

  function getCep(cep) {
    const fetchPosts = async () => {
      const response = await fetch(`https://api.postmon.com.br/v1/cep/${cep}`)
        .catch(err => {
          setErr(err.message)
          setPosts({
            bairro: '',
            cidade: '',
            logradouro: '',
            estado_info: {
              nome: '',
              area_km2: '',
              codigo_ibge: ''
            },
            cep: '',
          })
        })
      const postsData = await response.json()
      setPosts({
        bairro: postsData.bairro ? postsData.bairro : '---',
        cidade: postsData.cidade ? postsData.cidade : '---',
        logradouro: postsData.logradouro ? postsData.logradouro : '---',
        estado_info: {
          nome: postsData.estado_info.nome ? postsData.estado_info.nome : '---',
          area_km2: postsData.estado_info.area_km2 ? postsData.estado_info.area_km2 : '---',
          codigo_ibge: postsData.estado_info.codigo_ibge ? postsData.estado_info.codigo_ibge : '---'
        },
        cep: postsData.cep ? postsData.cep : '---',
      })
    }
    fetchPosts()
  }

  const handler = (event) => {
    if (event.key === 'Enter') {
      getCep(cep)
    }
  };

  const WarningIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="bg-slate-300 p-4 rounded-2xl shadow-lg flex flex-col items-start">
        <div className="flex flex-col items-center w-full">
          {posts.bairro | posts.cep | posts.cidade ? '' : WarningIcon}
          {posts.bairro | posts.cep | posts.cidade ? '' : <h1 className="text-red-600 mb-3">Verifique o cep informado</h1>}
        </div>
        <div className="flex flex-col items-center">
          <input className="border-2 rounded-lg text-center" type="text" onChange={e => setCep(e.target.value)} />
          <button onKeyPress={(e) => handler(e)} onClick={() => getCep(cep)} className="hover:bg-green-600 border-green-700 rounded-md mt-2 p-2 bg-green-700 text-white">Buscar</button>
        </div>
        <div className="flex flex-row items-center pt-3 pb-3">
          <div className="flex flex-col items-end">
            <p className="mr-2 font-bold">Bairro: </p>
            <p className="mr-2 font-bold">Cidade: </p>
            <p className="mr-2 font-bold">Logradouro: </p>
            <p className="mr-2 font-bold">Estado: </p>
            <p className="mr-2 font-bold">CEP: </p>
            <p className="mr-2 font-bold">KM²: </p>
            <p className="mr-2 font-bold">Ibge: </p>
          </div>
          <div className="flex flex-col items-start">
            <p>{posts.bairro}</p>
            <p>{posts.cidade}</p>
            <p>{posts.logradouro}</p>
            <p>{posts.estado_info.nome}</p>
            <p>{posts.cep}</p>
            <p>{posts.estado_info.area_km2}</p>
            <p>{posts.estado_info.codigo_ibge}</p>

          </div>
        </div>
      </div>
    </div>
  )
}