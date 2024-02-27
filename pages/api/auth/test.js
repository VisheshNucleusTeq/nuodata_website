'use server'
import { NextResponse } from "next/server";

import {
  withApiAuthRequired,
  getSession,
  getAccessToken,
} from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function myApiRoute(req, res) {
  const session = await getSession(req, res);
  NextResponse.json(session);
});