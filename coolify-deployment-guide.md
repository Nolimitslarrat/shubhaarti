# Deploying Subharti to Coolify via Docker Compose

This guide explains how to deploy the Subharti application (React Frontend, Node.js Backend, PostgreSQL Database) to your Coolify instance at `https://shubhaarti.in`.

## Prerequisites

1.  Your code must be pushed to a **Git repository** (e.g., GitHub, GitLab).
2.  Your Coolify instance must be running and connected to a server.
3.  The domain `shubhaarti.in` must have its DNS A-record pointing to your Coolify server's IP address.

## Step 1: Push Code to Git

First, ensure all the new Docker files are committed and pushed to your repository:

```bash
git add .
git commit -m "feat: Add Docker Compose configuration for Coolify deployment"
git push origin main
```

## Step 2: Create a New Resource in Coolify

1.  Log in to your **Coolify Dashboard**.
2.  Click on **+ New Resource**.
3.  Select **Git Repository** (Public or Private depending on your setup).
4.  Select the repository containing the Subharti code.
5.  Select the **Branch** (usually `main` or `master`).
6.  When prompted for the **Build Pack / Deployment Type**, select **Docker Compose**.

## Step 3: Configure Docker Compose in Coolify

Once the resource is created, navigate to its Configuration page in Coolify:

1.  **Compose File:** Coolify should automatically detect the `docker-compose.yml` file in the root directory. If not, explicitly define the path as `/docker-compose.yml`.
2.  **Domains:** 
    * Find the **client** container in the Coolify UI.
    * Set its FQDN (Fully Qualified Domain Name) to exactly: `https://shubhaarti.in`
    * *Note: You do NOT need to set a domain for the `server` or `db` containers. The `client` container's Nginx is already configured to securely proxy `/api` requests to the internal `server` container over the private Docker network.*

## Step 4: Environment Variables

In the **Environment Variables** section of your Coolify project, add the following secrets:

*   `JWT_SECRET`: A strong random string for your admin authentication (e.g., `your-very-secure-secret-key-1234`).
*   `DB_USER`: `postgres`
*   `DB_PASSWORD`: A strong password for your production database.
*   `DB_NAME`: `subharti`

*Coolify will automatically inject these into the Docker Compose file when building.*

## Step 5: Deploy

1.  Click the **Deploy** button.
2.  Coolify will read the `docker-compose.yml` file, build the Node.js backend, build the Vite frontend via multi-stage Nginx, and spin up the PostgreSQL database.
3.  During the backend startup, the command `npx prisma db push` will automatically run to ensure your production database schema is created and perfectly synced.
4.  Once the status turns to **Healthy**, navigate to `https://shubhaarti.in` in your browser.

## Step 6: Initial Setup in Production

Since the production database is fresh, you will not have an admin account yet.

To create your first admin account in production, you can make a single API request:

```bash
curl -X POST https://shubhaarti.in/api/admin/register \
-H "Content-Type: application/json" \
-d '{"email":"admin@shubhaarti.in","password":"YourSecurePassword123"}'
```

After running this command once, you can log in at `https://shubhaarti.in/admin/login` and begin managing the platform!
