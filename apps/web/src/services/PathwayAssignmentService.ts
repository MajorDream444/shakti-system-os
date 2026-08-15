import type { PathType } from "../begin/types.js";
import type { BeginIntakeResponseInput } from "../contracts/beginWriteContract.js";

export const PATHWAY_RULES_VERSION = "pathway-rules-v1";

const RESPONSE_SCORES: Record<string, Partial<Record<PathType, number>>> = {
  carry: { CIRCLE: 2, CONTAINER: 1 },
  focus: { ONE_ON_ONE: 2, CONTAINER: 1 },
  depth: { CONTAINER: 2, CIRCLE: 1, ONE_ON_ONE: 1, RETREAT: 1 },
  retreat: { RETREAT: 2, CONTAINER: 1 },
  gentle: { CIRCLE: 2 },
  personal: { ONE_ON_ONE: 2 },
  structured: { CONTAINER: 2 },
  immersive: { RETREAT: 2 },
  light: { CIRCLE: 2, CONTAINER: 1 },
  dedicated: { ONE_ON_ONE: 2, RETREAT: 1 },
  transformational: { CONTAINER: 2, RETREAT: 1 },
  "retreat-level": { RETREAT: 2, CONTAINER: 1 },
};

const PATHWAY_TIE_ORDER: PathType[] = ["CIRCLE", "ONE_ON_ONE", "CONTAINER", "RETREAT"];

function emptyScores(): Record<PathType, number> {
  return {
    CIRCLE: 0,
    ONE_ON_ONE: 0,
    CONTAINER: 0,
    RETREAT: 0,
  };
}

function scoreForResponse(responseValue: string): Record<PathType, number> {
  return {
    ...emptyScores(),
    ...(RESPONSE_SCORES[responseValue] ?? {}),
  };
}

export const PathwayAssignmentService = {
  scoreForResponse,

  assign(responses: readonly BeginIntakeResponseInput[]): {
    assignedPathway: PathType;
    scores: Record<PathType, number>;
    rulesVersion: typeof PATHWAY_RULES_VERSION;
  } {
    const scores = emptyScores();

    responses.forEach((response) => {
      const impact = scoreForResponse(response.responseValue);
      PATHWAY_TIE_ORDER.forEach((pathway) => {
        scores[pathway] += impact[pathway];
      });
    });

    const assignedPathway = PATHWAY_TIE_ORDER.reduce((winner, pathway) => {
      return scores[pathway] > scores[winner] ? pathway : winner;
    }, PATHWAY_TIE_ORDER[0]);

    return {
      assignedPathway,
      scores,
      rulesVersion: PATHWAY_RULES_VERSION,
    };
  },
};
