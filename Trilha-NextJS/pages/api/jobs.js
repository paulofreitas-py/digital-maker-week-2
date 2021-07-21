// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jobs from '../../src/docs/jobs.json'

export default function handler(req, res) {
  const { id } = req.query;
  if(req.query.secret === 'over') {
    if(req.method === 'GET') {
      if(id) {
        const [job = {}] = jobs.filter(job => job.id == id)
        res.status(200).json({
          error: false,
          jobs: job
        })
      } else {
        res.status(200).json({
          error: false,
          jobs
        })
      }
    } else {
      res.status(400).json({
        error: true,
        message: "Método não suportado"
      })
    }
  } else {
    res.status(400).json({
      error: true,
      message: "Secret inválida"
    })
  }
  
  
}
