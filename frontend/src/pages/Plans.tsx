import { useEffect, useState } from "react";
import { Box, Button, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { fetchPlans } from "../services/plans";
import { useNavigate } from "react-router-dom";
import { purchasePlan } from "../services/purchase";

interface Plan {
  id: string;
  name: string;
  steps: { name: string }[]; // Assuming the API returns an array of benefits
  isPopular: boolean;
}

const PlansPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPlans = async () => {
      try {
        const fetchedPlans = await fetchPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getPlans();
  }, []);

  function handlePurchase(planId: string) {
    purchasePlan(Number(planId)).then(() => {
      localStorage.setItem("purchased", "true");
      navigate("/dashboard");
    });
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <VStack spacing={8}>
      <Text fontSize="3xl" fontWeight="bold" mt={30}>
        Choose a plan
      </Text>
      <SimpleGrid columns={[1, null, 3]} spacing="40px" padding={12}>
        {plans.map((plan) => (
          <Box
            key={plan.id}
            p={5}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            shadow={plan.name === "Standard Plan" ? "2xl" : "md"}
            borderWidth={plan.name === "Standard Plan" ? "2px" : "1px"}
            borderColor={
              plan.name === "Standard Plan" ? "blue.300" : "gray.300"
            }
            borderRadius="lg"
            width={["100%", "100%", "300px"]}
            textAlign="center"
            position="relative"
            height={["100%", "100%", "400px"]}
            _hover={{ shadow: "xl" }}
          >
            <Text fontSize="2xl" fontWeight="bold">
              {plan.name}
              {"\n"}
              {plan.name === "Standard Plan" && (
                <Text fontSize="sm" color="gray.500">
                  Most popular
                </Text>
              )}
            </Text>

            <VStack mb={4}>
              {plan.steps.map((step, index) => (
                <Text key={index} fontSize="sm" color="gray.600">
                  {step.name}
                </Text>
              ))}
            </VStack>
            <Button
              colorScheme={plan.name === "Standard Plan" ? "blue" : "gray"}
              variant={plan.name === "Standard Plan" ? "solid" : "outline"}
              size="lg"
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              onClick={() => handlePurchase(plan.id)}
            >
              Purchase
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default PlansPage;
