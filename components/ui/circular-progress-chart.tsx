import { Box, Text } from "@chakra-ui/react";

interface CircularProgressChartProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  children?: React.ReactNode;
}

export const CircularProgressChart = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = "#059669", // emerald-600
  backgroundColor = "rgba(5, 150, 105, 0.12)",
  showPercentage = true,
  children,
}: CircularProgressChartProps) => {
  const normalizedRadius = (size - strokeWidth * 2) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const fontSize = Math.max(10, Math.min(24, size * 0.28));

  return (
    <Box position="relative" w={size} h={size}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          fill="transparent"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.3s ease-in-out",
          }}
        />
      </svg>

      {/* Prozentzahl im Kreis */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
      >
        {children ? (
          children
        ) : showPercentage ? (
          <Text fontSize={`${fontSize}px`} fontWeight="bold" color={color}>
            {Math.round(progress)}%
          </Text>
        ) : null}
      </Box>
    </Box>
  );
};