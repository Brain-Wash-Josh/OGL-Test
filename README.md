# OGL-Test

This repository contains a small Spring Boot backend and a React frontend used for development and testing.

**Repository Layout**
- `apps/`
  - `backend/` : Spring Boot backend (Maven)
    - `src/main/java/com/ogl/devtest/` : Java source
      - `customer/` : `Customer.java`, `CustomerController.java`, `CustomerRepository.java`, `PostCodeValidation.java`
      - `map/` : `Map.java`, `MapController.java`, `MapRepository.java`, `Geocoding.java`
      - `product/` : `Product.java`, `ProductController.java`, `ProductRepository.java`
    - `src/main/resources/` : `application.yml`, `schema.sql`, `data.sql`
    - `pom.xml`, `mvnw`, `mvnw.cmd` : Maven project + wrappers
    - `target/` : build output (generated)
  - `frontend/` : React frontend (Node/npm)
    - `package.json` : frontend dependencies and scripts
    - `public/` : `index.html`, `manifest.json`, `robots.txt` and other static assets
    - `src/` : React source
      - `components/` : reusable UI components (e.g. `header`, `table`, `page`)
      - `pages/` : route views (e.g. `customer`, `map`, `product`, `main`)
      - `assets/` : static images and icons
      - other files: `App.js`, `index.js`, `reportWebVitals.js`, tests, and styles

**Prerequisites**
- **Java**: `11` (project uses Java 11 as defined in `apps/backend/pom.xml`).
- **Maven**: Not required system-wide if you use the included Maven wrapper. Otherwise install Maven.
- **Node.js**: Recommended Node LTS (e.g. Node 16+). Install `npm` (comes with Node) or use `yarn`.
- **OS / Shell**: Examples use Windows PowerShell, but Unix/macOS commands are provided too.

**Backend (apps/backend)**
- **Install / Build dependencies**:
  - Use the included Maven wrapper (Windows PowerShell):

    ```powershell
    cd apps\backend
    .\mvnw.cmd clean package
    ```

  - Or on Unix/macOS:

    ```bash
    cd apps/backend
    ./mvnw clean package
    ```

- **Run in development (Spring Boot)**:
  - Windows PowerShell:

    ```powershell
    cd apps\backend
    .\mvnw.cmd spring-boot:run
    ```

  - Unix/macOS:

    ```bash
    cd apps/backend
    ./mvnw spring-boot:run
    ```

- **Run packaged jar**:

  ```powershell
  cd apps\backend
  .\mvnw.cmd clean package
  java -jar target\*.jar --spring.profiles.active=dev
  ```

- **Configuration**:
  - Main config file: `apps/backend/src/main/resources/application.yml`.
  - Database schema/data are in `schema.sql` and `data.sql` under `src/main/resources`.
  - To override config at runtime, pass Spring args to the jar, e.g. `java -jar target/*.jar --server.port=9090`.

**Frontend (apps/frontend)**
- **Install dependencies**:

  ```powershell
  cd apps\frontend
  npm install
  ```

  Or with `yarn`:

  ```powershell
  cd apps\frontend
  yarn install
  ```

- **Run development server**:

  ```powershell
  cd apps\frontend
  npm start
  ```

  The dev server typically runs on `http://localhost:3001`.

- **Build production bundle**:

  ```powershell
  cd apps\frontend
  npm run build
  ```

- **Run tests**:

  ```powershell
  cd apps\frontend
  npm test
  ```

**Start both (development)**
- Open two terminal windows/tabs. In one, start backend; in the other, start frontend.
  - Backend (PowerShell):

    ```powershell
    cd apps\backend
    .\mvnw.cmd spring-boot:run
    ```

  - Frontend (PowerShell):

    ```powershell
    cd apps\frontend
    npm install
    npm start
    ```

  - Defaults: backend `http://localhost:8080`, frontend `http://localhost:3001`.

**Common Troubleshooting**
- If you see a Java version error, verify `java -version` and install Java 11.
- If `mvnw.cmd` fails, ensure the file is executable and run it from the `apps\backend` folder.
- If the frontend can't reach the backend, check ports (backend default `8080`, frontend `3000`) and CORS settings.
- If you get dependency errors on the frontend, remove `node_modules` and reinstall:

  ```powershell
  cd apps\frontend
  rm -r node_modules
  npm install
  ```