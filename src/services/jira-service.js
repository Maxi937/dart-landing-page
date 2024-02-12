import fs from "fs";
import axios from "axios";
import logger from "../utils/logger.js";

export const jiraService = {
  url: process.env.JIRA_API,
  agileUrl: process.env.JIRA_AGILE_API,
  auth: Buffer.from(`${process.env.JIRA_USER}:${process.env.JIRA_KEY}`).toString("base64"),

  async getIssue(key) {
    const url = `${this.url}/issue/${key}`

    const res = await axios.get(url, {
      headers: {
        Authorization: `Basic ${this.auth}`,
        Accept: "application/json",
      },
    });
    console.log(res.data)
    return true;
  },

  async getBoards() {
    const url = `${this.agileUrl}/board`

    const res = await axios.get(url, {
      headers: {
        Authorization: `Basic ${this.auth}`,
        Accept: "application/json",
      },
    });

    return res.data.values;
  },

  async getSprintsByBoardId(id) {
    const url = `${this.agileUrl}/board/${id}/sprint`

    const res = await axios.get(url, {
      headers: {
        Authorization: `Basic ${this.auth}`,
        Accept: "application/json",
      },
    });
    return res.data.values;
  },

  async getIssuesBySprintId(id) {
    const url = `${this.agileUrl}/sprint/${id}/issue`

    const res = await axios.get(url, {
      headers: {
        Authorization: `Basic ${this.auth}`,
        Accept: "application/json",
      },
    });

    return res.data.issues;
  },

};
