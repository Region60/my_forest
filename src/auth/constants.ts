export const jwtConstants = {
    //secret: (process.env.NODE_ENV==='production')? process.env.JWT_SECRET : 'secretKey'
    secret: (process.env.NODE_ENV==='production')? process.env.JWT_SECRET : 'secretKey'
  }