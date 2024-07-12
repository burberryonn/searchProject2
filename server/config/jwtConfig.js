const jwtConfig = {
    access: {
      expiresIn: `${1000 * 60 * 20}`, // время жизни токена 5 минут
    },
    refresh: {
      expiresIn: `${1000 * 60 * 60 * 12}`, // время жизни токена 12 часов
    },
  };
  
  module.exports = jwtConfig;
