import Image from "next/image";
import { Card, Box, Flex, Text, Heading, Link, Section, Badge } from "@radix-ui/themes";

const classesData = [
    {
        common_name: 'Mole (Nevus)',
        description: 'A benign growth on the skin that develops when pigment cells (melanocytes) grow in clusters. Moles are very common and can be flat or raised, and typically have a uniform color.',
        characteristics: 'Generally uniform in color (tan, brown, pink), symmetrical, and has a well-defined border. Can be flat or raised. Often appears on sun-exposed areas.',
        risk_factors: 'Genetics, high number of moles, and sun exposure.',
        medication: 'Usually none required. Moles are typically not removed unless they are irritated or for cosmetic reasons.',
        next_steps: 'Regular self-examination using the ABCDE rule. Consult a dermatologist if a mole changes in size, shape, or color, or if it starts to itch or bleed.',
        type: 'benign',
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJFINE8Tb4o7S6DEsAi5x5pdcJ73GqZEOlTg&s",
    },
    {
        common_name: 'Melanoma',
        description: 'The most serious type of skin cancer, developing in the melanocytes. It is highly treatable when detected early, but can spread to other parts of the body if left untreated.',
        characteristics: 'Often follows the ABCDE rule: Asymmetrical shape, irregular Border, varied Color (shades of black, brown, tan), large Diameter (>6mm), and Evolving (changing) in size, shape, or color. Can appear anywhere on the body.',
        risk_factors: 'Extensive sun exposure, a history of sunburns, having many moles, light skin tone, and a family history of melanoma.',
        medication: 'Surgical excision is the primary treatment. May require immunotherapy, targeted therapy, chemotherapy, or radiation depending on the stage.',
        next_steps: 'Urgent referral to a dermatologist or oncologist is necessary for professional diagnosis and treatment planning.',
        type: 'malignant',
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI5JDl6g0bqWWcXJX7_HliR5oFO5KtwSiGTw&s",
    },
    {
        common_name: 'Seborrheic Keratosis',
        description: 'Common benign skin growths that often appear in middle age or older adulthood. They are harmless and not contagious.',
        characteristics: 'Often have a waxy, "pasted on" or "stuck on" appearance. Color can vary from tan to dark brown or black. They can be slightly raised and have a scaly or waxy surface.',
        risk_factors: 'Genetics and age are the main risk factors. They are not associated with sun exposure.',
        medication: 'Typically no treatment is required. For cosmetic removal, methods like cryotherapy (freeing), curettage, or laser therapy are used.',
        next_steps: 'Monitor for any changes. Consult a dermatologist for cosmetic removal or if the lesion becomes irritated or difficult to distinguish from a melanoma.',
        type: 'benign',
        image_url: "https://www.shutterstock.com/image-vector/seborrheic-keratosis-nonmalignant-skin-tumors-260nw-2670368231.jpg",
    },
    {
        common_name: 'Basal Cell Carcinoma',
        description: 'The most common type of skin cancer. It rarely spreads to other parts of the body but can damage surrounding tissue if not treated.',
        characteristics: 'Often appears as a pearly or waxy bump, a flat, flesh-colored or brown scar-like lesion, or a bleeding, non-healing sore. Typically found on sun-exposed areas like the face, neck, and ears.',
        risk_factors: 'Chronic sun exposure, frequent tanning bed use, and a history of sunburns.',
        medication: 'Surgical excision is the most common treatment. Other options include topical creams, cryotherapy, or radiation for some cases.',
        next_steps: 'Referral to a dermatologist for a biopsy to confirm diagnosis and determine the appropriate treatment plan.',
        type: 'malignant',
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTbCXbdI1KH_l9s8quxWl7W_kbdJdoEMu1vQ&s",
    },
    {
        common_name: 'Vascular Lesion',
        description: 'A benign growth of blood vessels. A common example is a Pyogenic Granuloma, which is a fast-growing, bright red bump that can bleed easily.',
        characteristics: 'Pyogenic Granulomas are typically bright red, raspberry-like bumps that can be soft and bleed easily. They often develop on the fingers, toes, or face.',
        risk_factors: 'Often caused by minor trauma to the skin, though the exact cause is not always clear.',
        medication: 'Removal is often necessary due to frequent bleeding. Surgical options or laser therapy are common.',
        next_steps: 'Consult a dermatologist for evaluation. A biopsy may be needed to confirm the diagnosis and rule out other conditions.',
        type: 'benign',
        image_url: "https://www.shutterstock.com/image-vector/hemangioma-on-facial-child-tumor-260nw-2188823455.jpg",
    },
    {
        common_name: 'Actinic Keratosis',
        description: 'A precancerous lesion that is a rough, scaly patch on the skin that develops after years of sun exposure. If left untreated, it can progress into squamous cell carcinoma.',
        characteristics: 'Appears as a dry, scaly patch or bump. It may feel like sandpaper to the touch. It is often flesh-colored, pink, or reddish-brown and is most common on the face, lips, ears, scalp, and back of hands.',
        risk_factors: 'Chronic sun exposure is the primary risk factor. People with fair skin, a history of sunburns, and older age are at higher risk.',
        medication: 'Cryotherapy (freezing) is a common treatment. Other options include topical creams (e.g., fluorouracil), chemical peels, or photodynamic therapy.',
        next_steps: 'Consult a dermatologist for a diagnosis and treatment plan to prevent progression to skin cancer.',
        type: 'malignant',
        image_url: "https://www.southwestdermatology.co.uk/wp-content/uploads/2020/05/Actinic-Keratosis-skin-condition-treatments-in-Exeter-by-South-West-Dermatology-976x1024.jpg",
    },
    {
        common_name: 'Dermatofibroma',
        description: 'A small, benign bump on the skin that is firm and reddish-brown. It is harmless and rarely causes symptoms.',
        characteristics: 'A firm, round bump that can be reddish-brown or purple. A key characteristic is the "dimple sign"—when squeezed from the sides, the center of the lesion will dimple inward. Commonly found on the legs and arms.',
        risk_factors: 'The exact cause is unknown, but they may form after an insect bite or other minor trauma to the skin.',
        medication: 'Usually none required. Removal is only necessary if it causes irritation, pain, or for cosmetic reasons.',
        next_steps: 'Monitor the lesion. If it becomes painful or changes in appearance, a dermatologist can provide a definitive diagnosis and discuss removal options.',
        type: 'benign',
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZCWSCwB6TSpZLk8X1HMOUG7SKc9kJN_0SWQ&s",
    },
    {
        common_name: 'Solar Lentigo',
        description: 'Common benign skin lesions, also known as "sun spots" or "age spots." They are caused by long-term sun exposure and are not cancerous.',
        characteristics: 'Flat, oval, or round patches of light brown to black pigmentation. They are typically found on sun-exposed areas like the face, hands, and shoulders.',
        risk_factors: 'Chronic sun exposure, history of sunburns, and older age.',
        medication: 'No medical treatment is required. Cosmetic treatments include cryotherapy, laser therapy, or topical bleaching creams.',
        next_steps: 'Solar lentigo itself is harmless, but its presence indicates significant sun exposure. Monitor for changes and perform regular skin self-exams. Consult a dermatologist for any suspicious spots.',
        type: 'benign',
        image_url: "https://thumbs.dreamstime.com/b/cross-section-freckles-skin-layer-vector-illustration-isolated-white-background-cross-section-freckles-skin-layer-333791391.jpg",
    }
];

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-center max-w-4xl w-full">
        <Section size="3">
          <Heading as="h1" size="8" align="center" mb="4">
            Understanding Skin Cancer & Early Detection
          </Heading>
          <Text as="p" size="3" align="center" color="accent">
            Skin cancer is the most common form of cancer, but its also highly treatable when detected early. Our mission is to empower you with knowledge and a tool for proactive health.
          </Text>
        </Section>

       <Section size="2">
            <Flex direction="column" gap="4">
              <Heading as="h2" size="6" color="teal" align="center">Classifications & What They Mean</Heading>
              <Flex gap="4" wrap="wrap" justify="center">
                {classesData.map((lesion) => (
                  <Card key={lesion.common_name} className="flex-1 min-w-[300px]">
                    <Box>
                      <div style={{ width: "100%", aspectRatio: "3/2", position: "relative", marginBottom: "1rem" }}>
                        <Image
                          src={lesion.image_url}
                          alt={lesion.common_name}
                          fill
                          style={{ objectFit: "cover", borderRadius: "var(--radius-4)" }}
                          className="mb-4"
                          sizes="(max-width: 600px) 100vw, 300px"
                        />
                      </div>
                      <Flex direction="column" gap="2">
                        <Heading as="h3" size="4" align="center">{lesion.common_name}</Heading>
                        <Flex justify="center">
                          <Badge color={lesion.type === 'benign' ? 'green' : 'red'} size="2">
                            {lesion.type === 'malignant' ? 'malignant / precancerous' : 'benign'}
                          </Badge>
                        </Flex>
                        <Text as="p" size="2">
                          <Text as="span" weight="bold">Description:</Text> {lesion.description}
                        </Text>
                        <Text as="p" size="2">
                          <Text as="span" weight="bold">Characteristics:</Text> {lesion.characteristics}
                        </Text>
                        <Text as="p" size="2">
                          <Text as="span" weight="bold">Risk Factors:</Text> {lesion.risk_factors}
                        </Text>
                        <Text as="p" size="2">
                          <Text as="span" weight="bold">Medication/Treatment:</Text> {lesion.medication}
                        </Text>
                        <Text as="p" size="2">
                          <Text as="span" weight="bold">Next Steps:</Text> {lesion.next_steps}
                        </Text>
                      </Flex>
                    </Box>
                  </Card>
                ))}
              </Flex>
            </Flex>
          </Section>

        <Section size="2">
          <Flex direction="column" gap="4">
            <Heading as="h2" size="6" align="center">Prevention & Proactive Care</Heading>
            <Flex gap="4" direction={{ initial: "column", md: "row" }} justify="center" align="center">
              <Card className="flex-1 min-h-[40vh]">
                <Box>
                  <Heading as="h3" size="4" mb="2" align="center">Sun Safety</Heading>
                  <Flex justify="center" align="center" mb="2">
                    <Image
                      src="/personal-data.png"
                      alt="Personal protection"
                      width={150}
                      height={150}
                      priority
                      style={{ filter: "invert(41%) sepia(92%) saturate(749%) hue-rotate(160deg) brightness(95%) contrast(90%)" }}
                    />
                  </Flex>
                  <ol className="list-inside list-decimal text-sm">
                    <li>Seek shade, especially during peak sun hours (10 a.m. - 4 p.m.).</li>
                    <li>Wear sun-protective clothing, a broad-brimmed hat, and sunglasses.</li>
                    <li>Apply broad-spectrum sunscreen with an SPF of 30 or higher.</li>
                  </ol>
                  <Flex justify="center" mt="3">
                    <Link href="https://www.cdc.gov/cancer/skin/basic_info/prevention.htm" target="_blank" rel="noopener noreferrer">
                      Learn more about prevention →
                    </Link>
                  </Flex>
                </Box>
              </Card>
              <Card className="flex-1 gap-4 min-h-[40vh]" href="/predict">
                <div className="gap-4 flex flex-col">
                  <Heading as="h3" size="4" mb="2" align="center">How Our AI Can Help</Heading>
                  <Flex justify="center" align="center" mt="4">
                    <Image
                      src="/magnifier.png"
                      alt="AI scanning a mole on the skin"
                      width={150}
                      height={150}
                      priority
                                            style={{ filter: "invert(41%) sepia(92%) saturate(749%) hue-rotate(160deg) brightness(95%) contrast(90%)" }}

                    />
                  </Flex>
                  <Text as="p" size="2" color="accent" align="center">
                    Our AI-powered tool is designed for early detection. By analyzing images of skin lesions, it can provide an immediate risk assessment, helping you determine if a spot requires a professional medical consultation.
                  </Text>
                  
                </div>
              </Card>
            </Flex>
          </Flex>
        </Section>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.cancer.gov/types/skin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
            style={{ filter: "invert(41%) sepia(92%) saturate(749%) hue-rotate(160deg) brightness(95%) contrast(90%)" }}
          />
          NCI: Skin Cancer Overview
        </a>
        
      </footer>
    </div>
  );
}