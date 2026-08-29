# Production release preconditions

The Bad Actors Google Cloud deployment target has been verified through a read-only GitHub Actions diagnostic.

- Google service-account authentication succeeds.
- Project, Cloud Run region, and Cloud Run service settings are present.
- The configured Cloud Run service exists and is Ready.
- Production deploys update only that existing service.
- Releases are built with immutable Git SHA tags and verified through `/health`.

The `main` branch deployment workflow is therefore expected to release automatically after the quality gate passes.
