import { Section, Container } from "@/components/craft";
import { InputForm } from "@/components/main/form";

export default function Page() {
  return (
    <Section className="flex items-center justify-center min-h-screen p-4">
      <Container className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold mb-2">
            Submit your information!
          </h1>
          <h3 className="text-lg text-gray-600">
            Please fill out the form below to submit your information.
          </h3>
        </div>
        {/* Form */}
        <div className="bg-gray-100 border border-gray-300 p-6 rounded">
          <InputForm />
        </div>
      </Container>
    </Section>
  );
}
