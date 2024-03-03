import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  Heading,
  VStack,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { getPurchasedPlans, updateStep } from "../services/purchase";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

interface Step {
  name: string;
  order: number;
  isComplete?: boolean;
}

interface Plan {
  id: number;
  name: string;
  steps: Step[];
}

const DashboardPage = () => {
  const [purchasedPlans, setPurchasedPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchasedPlans = async () => {
      try {
        const plans = await getPurchasedPlans();
        setPurchasedPlans(plans);
      } catch (error) {
        console.error("Failed to fetch purchased plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchasedPlans();
  }, []);

  function handleUpdateStep(planId: number, stepOrder: number) {
    updateStep(Number(planId), stepOrder).then(() => {
      const updatedPlans = purchasedPlans.map((plan) => {
        if (plan.id === planId) {
          const updatedSteps = plan.steps.map((step) => {
            if (step.order === stepOrder) {
              return { ...step, isComplete: step.isComplete ? false : true };
            }
            return step;
          });
          return { ...plan, steps: updatedSteps };
        }
        return plan;
      });
      setPurchasedPlans(updatedPlans);
    });
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <Flex flexDirection="row" justifyContent={"space-between"}>
        <Text fontSize="md" mt={30} ml={30} textAlign="left">
          <IconButton
            aria-label="Get more plans"
            onClick={() => navigate("/plans")}
            icon={<ArrowBackIcon />}
            mr={2}
          />
          Purchase more plans
        </Text>
        <Button
          colorScheme={"blue"}
          variant={"solid"}
          size="md"
          mt={30}
          mr={30}
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Flex>

      <Text fontSize="3xl" fontWeight="bold" textAlign="center" mt={8}>
        Your purchased plans
      </Text>
      <Text fontSize="md" textAlign="center">
        Feel free to mark the steps you have completed
      </Text>

      <VStack spacing={8} padding={8}>
        {purchasedPlans.map((plan, index) => (
          <Box
            key={index}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            width="100%"
            maxWidth="500px"
          >
            <Heading size="md" mb={4}>
              {plan.name}
            </Heading>
            <CheckboxGroup colorScheme="green">
              <Stack spacing={3}>
                {plan.steps
                  .sort((a, b) => a.order - b.order)
                  .map((step) => (
                    <Checkbox
                      key={step.order}
                      onChange={() => handleUpdateStep(plan.id, step.order)}
                      isChecked={step.isComplete}
                    >
                      {step.name}
                    </Checkbox>
                  ))}
              </Stack>
            </CheckboxGroup>
          </Box>
        ))}
      </VStack>
    </>
  );
};

export default DashboardPage;
