
### **Endpoints CRUD:**

#### 1. **Obtener todas las películas**  
   Retorna todas las películas que no han sido eliminadas lógicamente (soft delete).

- **URL:** `/`
- **Método:** `GET`
- **Respuesta exitosa:**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    [
      {
        "id": "e8e8f7d9-ff22-4dc5-b94a-98e72ec18f62",
        "nombre": "Inception",
        "resumen": "A mind-bending thriller",
        "rating": 5,
        "categoria": "Ciencia Ficción",
        "imagen": "https://image-url.com",
        "isDeleted": false
      },
      ...
    ]
    ```
- **Errores:**
  - **Código:** `500 Internal Server Error`
  - **Cuerpo:** `{ "error": "Error al obtener las películas." }`

#### 2. **Obtener una película por ID**  
   Retorna la película con el ID proporcionado.

- **URL:** `/:id`
- **Método:** `GET`
- **Parámetros de URL:**
  - `id`: UUID de la película.
- **Respuesta exitosa:**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "id": "e8e8f7d9-ff22-4dc5-b94a-98e72ec18f62",
      "nombre": "Inception",
      "resumen": "A mind-bending thriller",
      "rating": 5,
      "categoria": "Ciencia Ficción",
      "imagen": "https://image-url.com",
      "isDeleted": false
    }
    ```
- **Errores:**
  - **Código:** `404 Not Found`
  - **Cuerpo:** `{ "error": "Película no encontrada." }`
  - **Código:** `500 Internal Server Error`
  - **Cuerpo:** `{ "error": "Error al obtener la película." }`

#### 3. **Crear una nueva película**  
   Crea una nueva película con los datos proporcionados.

- **URL:** `/`
- **Método:** `POST`
- **Cuerpo de la solicitud:** (JSON)
  ```json
  {
    "nombre": "Inception",
    "resumen": "A mind-bending thriller",
    "rating": 5,
    "categoria": "Ciencia Ficción",
    "imagen": "https://image-url.com"
  }
  ```

#### 4. **Actualizar una película existente**  
   Actualiza una película por su ID.

- **URL:** `/:id`
- **Método:** `PUT`
- **Parámetros de URL:**
  - `id`: UUID de la película.
- **Cuerpo de la solicitud:** (JSON)
  ```json
  {
    "nombre": "Inception (Updated)",
    "resumen": "A mind-bending thriller",
    "rating": 4,
    "categoria": "Ciencia Ficción",
    "imagen": "https://image-url.com"
  }
  ```

#### 5. **Eliminar (soft delete) una película**  
   Marca una película como eliminada sin borrarla físicamente.

- **URL:** `/:id`
- **Método:** `DELETE`
- **Parámetros de URL:**
  - `id`: UUID de la película.
- **Respuesta exitosa:**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    {
      "message": "Película eliminada correctamente."
    }
    ```
- **Errores:**
  - **Código:** `404 Not Found`
  - **Cuerpo:** `{ "error": "Película no encontrada." }`
  - **Código:** `500 Internal Server Error`
  - **Cuerpo:** `{ "error": "Error al eliminar la película." }`

## **Filtros y búsqueda:**

#### 1. **Buscar películas por nombre**  
   Busca películas que coincidan con el nombre proporcionado.

- **URL:** `/search?nombre=<nombre>`
- **Método:** `GET`
- **Respuesta exitosa:**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    [
      {
        "id": "e8e8f7d9-ff22-4dc5-b94a-98e72ec18f62",
        "nombre": "Inception",
        "resumen": "A mind-bending thriller",
        "rating": 5,
        "categoria": "Ciencia Ficción",
        "imagen": "https://image-url.com",
        "isDeleted": false
      }
    ]
    ```
- **Errores:**
  - **Código:** `500 Internal Server Error`
  - **Cuerpo:** `{ "error": "Error al realizar la búsqueda." }`

#### 2. **Filtrar películas por categoría**  
   Filtra películas que pertenezcan a una categoría específica.

- **URL:** `/filter?categoria=<categoria>`
- **Método:** `GET`
- **Respuesta exitosa:**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    [
      {
        "id": "e8e8f7d9-ff22-4dc5-b94a-98e72ec18f62",
        "nombre": "Inception",
        "resumen": "A mind-bending thriller",
        "rating": 5,
        "categoria": "Ciencia Ficción",
        "imagen": "https://image-url.com",
        "isDeleted": false
      }
    ]
    ```

#### 3. **Filtrar películas por rating**  
   Filtra películas por su calificación en orden ascendente o descendente.

- **URL:** `/filter?rating=<asc|desc>`
- **Método:** `GET`
- **Respuesta exitosa:**
  - **Código:** `200 OK`
  - **Cuerpo:**
    ```json
    [
      {
        "id": "e8e8f7d9-ff22-4dc5-b94a-98e72ec18f62",
        "nombre": "Inception",
        "resumen": "A mind-bending thriller",
        "rating": 5,
        "categoria": "Ciencia Ficción",
        "imagen": "https://image-url.com",
        "isDeleted": false
      }
    ]
    ```

## **Notas adicionales:**  
- **Autenticación:** Actualmente, la API no requiere autenticación.  
- **Manejo de errores:** Todos los errores del servidor se manejan con códigos de estado apropiados y respuestas JSON.  
- **Validación de entradas:** Para las operaciones de creación y actualización, se valida que los campos `nombre`, `resumen`, `rating`, y `categoria` sean válidos y estén presentes.
