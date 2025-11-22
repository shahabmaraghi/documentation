export const otpTemplateParamsApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "دریافت پارامترهای قالب OTP - Ghasedak SMS API",
    version: "1.0.0",
    description: "از این متد می توانید برای دریافت پارامترهای قالب OTP استفاده کنید.",
    contact: {
      name: "پشتیبانی قاصدک",
      email: "support@ghasedak-ict.com",
      url: "https://ghasedak.me"
    }
  },
  servers: [
    {
      url: "https://gateway.ghasedak.me/rest/api/v1",
      description: "سرور اصلی قاصدک"
    }
  ],
  paths: {
    "/WebService/GetOtpTemplateParameters": {
      get: {
        summary: "دریافت پارامترهای قالب OTP",
        description: `دریافت لیست پارامترهای تعریف شده در قالب OTP و متن پیام.

این متد به شما کمک می‌کند تا:
- لیست تمام پارامترهای قالب را مشاهده کنید
- متن کامل پیام با جایگذاری پارامترها را ببینید
- از صحت نام پارامترها قبل از ارسال اطمینان حاصل کنید`,
        operationId: "getOtpTemplateParameters",
        tags: ["OTP", "Template"],
        security: [
          {
            ApiKey: []
          }
        ],
        "x-code-samples": [
          {
            lang: "curl",
            label: "cURL",
            source: `curl -X GET "https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters?TemplateName=Ghasedak" \\
  -H "ApiKey: your-api-key-here"`
          },
          {
            lang: "php",
            label: "PHP",
            source: `<?php
$templateName = "Ghasedak";
$apiKey = "your-api-key-here";

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters?TemplateName=" . urlencode($templateName),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
        "ApiKey: " . $apiKey
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "خطا: " . $err;
} else {
    $result = json_decode($response, true);
    if ($result['IsSuccess']) {
        echo "پارامترها: " . implode(", ", $result['Data']['Params']) . "\\n";
        echo "متن پیام: " . $result['Data']['Message'];
    }
}
?>`
          },
          {
            lang: "javascript",
            label: "Node.js",
            source: `const axios = require('axios');

const getTemplateParameters = async (templateName) => {
  try {
    const response = await axios.get(
      'https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters',
      {
        params: { TemplateName: templateName },
        headers: { 'ApiKey': 'your-api-key-here' }
      }
    );
    
    if (response.data.IsSuccess) {
      console.log('پارامترها:', response.data.Data.Params);
      console.log('متن پیام:', response.data.Data.Message);
      return response.data.Data;
    }
  } catch (error) {
    console.error('خطا:', error.response?.data || error.message);
  }
};

getTemplateParameters('Ghasedak');`
          },
          {
            lang: "python",
            label: "Python",
            source: `import requests

def get_template_parameters(template_name):
    url = "https://gateway.ghasedak.me/rest/api/v1/WebService/GetOtpTemplateParameters"
    headers = {"ApiKey": "your-api-key-here"}
    params = {"TemplateName": template_name}
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        result = response.json()
        
        if result.get('IsSuccess'):
            print(f"پارامترها: {', '.join(result['Data']['Params'])}")
            print(f"متن پیام: {result['Data']['Message']}")
            return result['Data']
    except requests.exceptions.RequestException as e:
        print(f"خطا: {e}")
        return None

get_template_parameters('Ghasedak')`
          }
        ],
        parameters: [
          {
            name: "TemplateName",
            in: "query",
            required: true,
            description: "نام قالب",
            schema: {
              type: "string",
              example: "Ghasedak"
            }
          }
        ],
        responses: {
          "200": {
            description: "پاسخ موفق",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    isSuccess: {
                      type: "boolean",
                      description: "وضعیت پاسخ وب سرویس"
                    },
                    statusCode: {
                      type: "integer",
                      description: "کد وضعیت"
                    },
                    message: {
                      type: "string",
                      description: "پیام وضعیت وب سرویس"
                    },
                    data: {
                      type: "object",
                      properties: {
                        params: {
                          type: "array",
                          description: "نام پارامترها",
                          items: {
                            type: "string"
                          }
                        },
                        message: {
                          type: "string",
                          description: "پیام OTP"
                        }
                      }
                    }
                  }
                },
                examples: {
                  example1: {
                    summary: "نمونه پاسخ",
                    value: {
                      Data: {
                        Params: ["Code", "Name"],
                        Message: "کد تایید شما %Code% می باشد\nبه سایت %Name% خوش آمدید"
                      },
                      IsSuccess: true,
                      StatusCode: 200,
                      Message: "با موفقیت انجام شد"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      ApiKey: {
        type: "apiKey",
        in: "header",
        name: "ApiKey",
        description: "کلید شناسه API"
      }
    }
  }
};
