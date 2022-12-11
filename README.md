# Aalto University - CS-E4770 - Project 3

This is a repository for the CS-E4770 (Designing and Building Scalable Web Applications) course's third project. The goal of this project is to build a [Jodel](https://advertising.jodel.com/appdownload-en) clone (without the geolocation feature). The user should be able to create a new post, upvote and downvote posts and reply to posts.

## Description

The frontend displays the latest 20 posts with timestamps, the user can upvote and downvote the posts. After clicking on the post, the user can add a comment and also ready other comments for that post. Each user is given an id when first visiting the website.

The posts and comments are stored in a PostgreSQL database.

The production version of this application uses Kubernetes and a database operator for running PostgreSQL. There are also commands for auto-scaling the application.

## Used technologies

- Astro
- React
- Go
- Gin
- TypeScript
- PostgreSQL
- Kubernetes
- Docker + Docker-compose
- Flyway

## Design

- **UI** - the frontend of the application (Astro + React + TypeScript)
- **API** - handling requests from the frontend and handling the communication with the database
- Flyway - database migrations
- Kubernetes - all the kubernetes configuration files
- k6 - performance tests

### API endpoints

- GET `/api/` - healthcheck
- GET `/api/posts` - get all posts in the database
- GET `/api/posts/:id` - get post by id
- GET `/api/comments` - get all comments in the database
- GET `/api/posts/:id/comments` - get all comments related to a specific post
- POST `/api/posts` - create new post
- POST `/api/posts/:id/comments` - create new comment under a specific post
- PUT `/api/posts/:id` - update post
- PUT `/api/posts/:id/upvote` - upvote post
- PUT `/api/posts/:id/downvote` - downvote post

## How to run

### Development

```bash
docker-compose up --build
```

### Production (with Kubernetes)

```bash
# Start minikube
minikube start

# Run CloudNativePG operator
kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.18/releases/cnpg-1.18.0.yaml

# Restart minikube
minikube stop
minikube start

# Start dashboard (in a separate terminal) [optional; recommended]
minikube dashboard

# Run database cluster (from root of the project)
#   You should wait until the database cluster fully starts;
#     you can check in dashboard or just wait a little bit
#
#   There should be a set of secrets created, that you can check in:
#     minikube dashboard -> Config and Storage -> Secrets -> my-database-cluster-app -> pgpass
kubectl apply -f kubernetes/database-config.yaml

# Enable ingress
minikube addons enable ingress

# Enable metrics [optional]
minikube addons enable metrics-server

# Build ui
yarn --cwd ./ui build

# Load docker images into minikube
minikube image build -t api ./api
minikube image build -t flyway ./flyway
minikube image build -t ui ./ui

# Create pods
#   Again, please, wait a little bit until everything starts etc.
kubectl apply -f kubernetes/

# Add autoscaling
kubectl autoscale deployment.apps/api --min=1 --max=3 --cpu-percent=25
kubectl autoscale deployment.apps/ui --min=1 --max=3 --cpu-percent=25

# Create tunnel (it will prompt you for sudo password)
minikube tunnel

##################################################################

# If something goes wrong, you can delete all pods by running
kubectl delete -f kubernetes/

# Keep in mind to always start the database cluster first
kubectl apply -f kubernetes/database-config.yaml

# And then, after it starts, start all the other pods
kubectl apply -f kubernetes/

# Don't forget to create the tunnel
minikube tunnel
```

## Performance

I tried to make sure that the tests are accurately representing the performance by rerunning them several times and then taking the maximum out of those tries.

The tests were ran on my personal computer (AMD Ryzen 7 5800X, 16GB DDR4), the Lighthouse tests were ran in a clean Google Chrome (version 107.0.5304.110, no extensions other than Lighthouse).

### Lighthouse

Settings used:

- Mode = Navigation
- Device = Desktop
- Categories = Performance, Accessibility, Best practices, SEO

- **Performance** = 93
  - First Contentful Paint = 0.2s
  - Time to Interactive = 0.4s
  - Speed Index = 0.2s
  - Total Blocking Time = 0ms
  - Largest Contentful Paint = 1.7s
  - Cumulative Layout Shift = 0
- Accessibility = 81
- Best practices = 100
- SEO = 78

### k6

I ran the tests with 10 VUS for 10 seconds.

I could not test the comment page (as I just show the comments below the post), I decided to test the main page and then test the main api endpoints instead (`/posts`, `/comments`, POST `/posts`, POST `/posts/1/comments`)

| Endpoint / Metric | Average [ms] | Median [ms] | p(90) [ms] | p(95) [ms] | p(99) [ms] |
| ----------------- | ------------ | ----------- | ---------- | ---------- | ---------- |
| Index             | 0.617        | 0.578       | 0.759      | 0.840      | 1.12       |
| GET posts         | 135.39ms     | 151.05      | 186.78     | 192.46     | 281.53     |
| GET comments      | 242.55       | 269.29      | 366.27     | 272.96     | 397.54     |
| POST post         | 5.79         | 2.42        | 3.25       | 52.10      | 62.77      |
| POST comment      | 6.46         | 2.51        | 3.48       | 56.32      | 68.27      |

## Reflection

I think the results got influenced by the amount of data in the database; that's why posting takes much less time than fetching. Another thing, that I've learned in the first project, is that the request logging (the API logs every incoming request) influences the performance results a lot (sometimes even >100% slower), I decided to not disable the logging functionality for debugging purposes for the kubernetes.

Overall I've spent way too much time on configuring the kubernetes and didn't have enough time to improve the performance further.

## Improvements

There are several crucial improvements regarding the performance. The biggest improvement would be to fetch only the latest 20 posts and not fetching the whole table and then filtering only the latest posts on the front-end. Another improvement would be to use caching. The autoscaling was picked arbitrarily - the configuration of the autoscaling could have been chosen more carefully. And also it would be nice to implement the features listed in the "with merits" part of this project.
