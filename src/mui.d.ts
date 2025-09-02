import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    status: {
      active: string;
      paused: string;
      closed: string;
      activeText: string;
      pausedText: string;
      closedText: string;
    };

    questionType: {
      behavioral: string;
      technical: string;
      situational: string;
      behavioralText: string;
      technicalText: string;
      situationalText: string;
    };

    evaluationType: {
      exceeds: string;
      above: string;
      meets: string;
      below: string;
      doesNotMeet: string;
      exceedsText: string;
      aboveText: string;
      meetsText: string;
      belowText: string;
      doesNotMeetText: string;
      exceedsBorder: string;
      aboveBorder: string;
      meetsBorder: string;
      belowBorder: string;
      doesNotMeetBorder: string;
    };
  }

  interface PaletteOptions {
    status?: {
      active?: string;
      paused?: string;
      closed?: string;
      activeText?: string;
      pausedText?: string;
      closedText?: string;
    };
    questionType?: {
      behavioral?: string;
      technical?: string;
      situational?: string;
      behavioralText?: string;
      technicalText?: string;
      situationalText?: string;
    };
    evaluationType?: {
      exceeds?: string;
      above?: string;
      meets?: string;
      below?: string;
      doesNotMeet?: string;
      exceedsText?: string;
      aboveText?: string;
      meetsText?: string;
      belowText?: string;
      doesNotMeetText?: string;
      exceedsBorder?: string;
      aboveBorder?: string;
      meetsBorder?: string;
      belowBorder?: string;
      doesNotMeetBorder?: string;
    };
  }
}
