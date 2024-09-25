import config from "../../config.js";
export const infoSwagger = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "LiquidStore API documentation",
      version: "1.0.0",
      description: `LiquidStore es un trabajo practico de Ejemplo del curso de FullStack de coderhouse. El mismo se fue construyendo de forma integral desde el curso de react, react native y backend.
Esta documentación corresponde a los diferentes endpoints del servidor backend construido en Node y express.

Links de utilidad:
  - [React FrontEnd Repository](https://github.com/juanPabloSarobe/react-47225)
  - [React Native APP Repository](https://github.com/juanPabloSarobe/LiquidStoreApp)`,
    },
    servers: [
      {
        description: "localHost server for development",
        url: `http://localhost:${config.PORT}/api`,
      },
      {
        description: "Render API deploy",
        url: `https://liquidstore-backend.onrender.com/api`,
      },
      // {
      //      - url: https://api.example.com/v1
      // description: Production server (uses live data)
      // - url: https://sandbox-api.example.com:8443/v1
      // description: Sandbox server (uses test data)
      // }
    ],
  },
  apis: ["./src/docs/*.yml"],
};
