export const sendOtpSmsNewApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "ارسال پیامک OTP جدید - Ghasedak SMS API",
    version: "1.0.0",
    description: "از این متد برای ارسال پیامک OTP با استفاده از قالب‌های از پیش تعریف شده استفاده می‌شود.",
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
    "/WebService/SendOtpSMS": {
      post: {
        summary: "ارسال پیامک OTP جدید",
        description: `ارسال پیامک OTP با قابلیت‌های پیشرفته.

این متد امکانات زیر را فراهم می‌کند:
- ارسال همزمان به چندین گیرنده
- استفاده از قالب‌های سفارشی
- زمان‌بندی ارسال
- ارسال صوتی
- ردیابی با شناسه محلی`,
        operationId: "sendOtpSmsNew",
        tags: ["OTP", "SMS", "Verification"],
        security: [
          {
            ApiKey: []
          }
        ],
        parameters: [
          {
            name: "ApiKey",
            in: "header",
            required: true,
            description: "کلید احراز هویت لازم برای ارسال درخواست.",
            schema: {
              type: "string"
            }
          },
          {
            name: "Content-Type",
            in: "header",
            required: true,
            description: "برای ارسال بدنه‌ی JSON مقدار باید application/json باشد.",
            schema: {
              type: "string",
              enum: ["application/json"]
            }
          }
        ],
        "x-code-samples": [
          {
            lang: "curl",
            label: "cURL",
            source: `curl -X POST "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS" \\
  -H "Content-Type: application/json" \\
  -H "ApiKey: your-api-key-here" \\
  -d '{
    "sendDate": "2024-12-25T09:51:45Z",
    "receptors": [
      {
        "mobile": "0919********",
        "clientReferenceId": "1"
      }
    ],
    "templateName": "Ghasedak",
    "inputs": [
      {
        "param": "Code",
        "value": "1234"
      }
    ],
    "udh": false,
    "isVoice": false
  }'`
          },
          {
            lang: "php",
            label: "PHP",
            source: `<?php
$curl = curl_init();

$data = [
    "sendDate" => "2024-12-25T09:51:45Z",
    "receptors" => [
        [
            "mobile" => "0919********",
            "clientReferenceId" => "1"
        ],
        [
            "mobile" => "0937********",
            "clientReferenceId" => "2"
        ]
    ],
    "templateName" => "Ghasedak",
    "inputs" => [
        [
            "param" => "Code",
            "value" => "1234"
        ]
    ],
    "udh" => false,
    "isVoice" => false
];

curl_setopt_array($curl, [
    CURLOPT_URL => "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => [
        "Content-Type: application/json",
        "ApiKey: your-api-key-here"
    ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);
curl_close($curl);

if ($err) {
    echo "خطا: " . $err;
} else {
    $result = json_decode($response, true);
    if ($result['isSuccess']) {
        echo "موفق! هزینه کل: " . $result['data']['totalCost'];
    }
}
?>`
          },
          {
            lang: "javascript",
            label: "Node.js",
            source: `const axios = require('axios');

const sendOTP = async () => {
  try {
    const response = await axios.post(
      'https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS',
      {
        sendDate: '2024-12-25T09:51:45Z',
        receptors: [
          {
            mobile: '0919********',
            clientReferenceId: '1'
          },
          {
            mobile: '0937********',
            clientReferenceId: '2'
          }
        ],
        templateName: 'Ghasedak',
        inputs: [
          {
            param: 'Code',
            value: '1234'
          }
        ],
        udh: false,
        isVoice: false
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'ApiKey': 'your-api-key-here'
        }
      }
    );
    
    console.log('موفق:', response.data);
    console.log('هزینه کل:', response.data.data.totalCost);
    return response.data;
  } catch (error) {
    console.error('خطا:', error.response?.data || error.message);
    throw error;
  }
};

sendOTP();`
          },
          {
            lang: "python",
            label: "Python",
            source: `import requests
import json

url = "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS"

headers = {
    "Content-Type": "application/json",
    "ApiKey": "your-api-key-here"
}

data = {
    "sendDate": "2024-12-25T09:51:45Z",
    "receptors": [
        {
            "mobile": "0919********",
            "clientReferenceId": "1"
        },
        {
            "mobile": "0937********",
            "clientReferenceId": "2"
        }
    ],
    "templateName": "Ghasedak",
    "inputs": [
        {
            "param": "Code",
            "value": "1234"
        }
    ],
    "udh": False,
    "isVoice": False
}

try:
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    
    result = response.json()
    if result.get('isSuccess'):
        print(f"موفق! هزینه کل: {result['data']['totalCost']}")
        print(json.dumps(result, indent=2, ensure_ascii=False))
except requests.exceptions.RequestException as e:
    print(f"خطا: {e}")
    if hasattr(e, 'response') and e.response is not None:
        print(e.response.text)`
          },
          {
            lang: "csharp",
            label: "C#",
            source: `using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

public class OtpSender
{
    private static readonly HttpClient client = new HttpClient();
    
    public static async Task SendOTP()
    {
        var url = "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS";
        
        var requestData = new
        {
            sendDate = "2024-12-25T09:51:45Z",
            receptors = new[]
            {
                new { mobile = "0919********", clientReferenceId = "1" },
                new { mobile = "0937********", clientReferenceId = "2" }
            },
            templateName = "Ghasedak",
            inputs = new[]
            {
                new { param = "Code", value = "1234" }
            },
            udh = false,
            isVoice = false
        };
        
        var json = JsonSerializer.Serialize(requestData);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        
        client.DefaultRequestHeaders.Clear();
        client.DefaultRequestHeaders.Add("ApiKey", "your-api-key-here");
        
        try
        {
            var response = await client.PostAsync(url, content);
            response.EnsureSuccessStatusCode();
            
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine("موفق: " + responseBody);
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine("خطا: " + e.Message);
        }
    }
    
    static async Task Main(string[] args)
    {
        await SendOTP();
    }
}`
          },
          {
            lang: "java",
            label: "Java",
            source: `import okhttp3.*;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.IOException;

public class OtpSender {
    private static final String API_URL = "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS";
    private static final String API_KEY = "your-api-key-here";
    
    public static void main(String[] args) {
        try {
            sendOTP();
        } catch (IOException e) {
            System.err.println("خطا: " + e.getMessage());
        }
    }
    
    public static void sendOTP() throws IOException {
        OkHttpClient client = new OkHttpClient();
        
        JSONObject receptor1 = new JSONObject()
            .put("mobile", "0919********")
            .put("clientReferenceId", "1");
            
        JSONObject receptor2 = new JSONObject()
            .put("mobile", "0937********")
            .put("clientReferenceId", "2");
            
        JSONObject input = new JSONObject()
            .put("param", "Code")
            .put("value", "1234");
        
        JSONObject requestBody = new JSONObject()
            .put("sendDate", "2024-12-25T09:51:45Z")
            .put("receptors", new JSONArray().put(receptor1).put(receptor2))
            .put("templateName", "Ghasedak")
            .put("inputs", new JSONArray().put(input))
            .put("udh", false)
            .put("isVoice", false);
        
        RequestBody body = RequestBody.create(
            requestBody.toString(),
            MediaType.parse("application/json")
        );
        
        Request request = new Request.Builder()
            .url(API_URL)
            .post(body)
            .addHeader("Content-Type", "application/json")
            .addHeader("ApiKey", API_KEY)
            .build();
        
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("خطا: " + response);
            }
            
            String responseBody = response.body().string();
            System.out.println("موفق: " + responseBody);
        }
    }
}`
          },
          {
            lang: "go",
            label: "Go",
            source: `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

type Receptor struct {
    Mobile            string \`json:"mobile"\`
    ClientReferenceId string \`json:"clientReferenceId"\`
}

type Input struct {
    Param string \`json:"param"\`
    Value string \`json:"value"\`
}

type OTPRequest struct {
    SendDate     string     \`json:"sendDate"\`
    Receptors    []Receptor \`json:"receptors"\`
    TemplateName string     \`json:"templateName"\`
    Inputs       []Input    \`json:"inputs"\`
    Udh          bool       \`json:"udh"\`
    IsVoice      bool       \`json:"isVoice"\`
}

func sendOTP() error {
    url := "https://gateway.ghasedak.me/rest/api/v1/WebService/SendOtpSMS"
    apiKey := "your-api-key-here"
    
    otpReq := OTPRequest{
        SendDate: "2024-12-25T09:51:45Z",
        Receptors: []Receptor{
            {Mobile: "0919********", ClientReferenceId: "1"},
            {Mobile: "0937********", ClientReferenceId: "2"},
        },
        TemplateName: "Ghasedak",
        Inputs: []Input{
            {Param: "Code", Value: "1234"},
        },
        Udh:     false,
        IsVoice: false,
    }
    
    jsonData, err := json.Marshal(otpReq)
    if err != nil {
        return fmt.Errorf("خطا در تبدیل به JSON: %v", err)
    }
    
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    if err != nil {
        return fmt.Errorf("خطا در ساخت درخواست: %v", err)
    }
    
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("ApiKey", apiKey)
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return fmt.Errorf("خطا در ارسال درخواست: %v", err)
    }
    defer resp.Body.Close()
    
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return fmt.Errorf("خطا در خواندن پاسخ: %v", err)
    }
    
    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("خطا: کد وضعیت %d - %s", resp.StatusCode, string(body))
    }
    
    fmt.Printf("موفق: %s\\n", string(body))
    return nil
}

func main() {
    if err := sendOTP(); err != nil {
        fmt.Printf("خطا: %v\\n", err)
    }
}`
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                title: "Body",
                type: "object",
                required: ["receptors", "templateName", "inputs"],
                properties: {
                  sendDate: {
                    type: "string",
                    format: "date-time",
                    description: "تاریخ و زمان دقیق ارسال پیام که اگر قید نشود در همان لحظه OTP ارسال می شود.",
                    example: "2024-12-25T09:51:45Z"
                  },
                  receptors: {
                    type: "array",
                    description: "لیست گیرندگان پیام",
                    items: {
                      type: "object",
                      required: ["mobile"],
                      properties: {
                        mobile: {
                          type: "string",
                          description: "شماره گیرنده پیام",
                          example: "0919********"
                        },
                        clientReferenceId: {
                          type: "string",
                          description: "برای تعیین شماره ای یکتا از طرف کاربر برای هر پیامک به کار می رود",
                          example: "1"
                        }
                      }
                    }
                  },
                  templateName: {
                    type: "string",
                    description: "نام قالب",
                    example: "Ghasedak"
                  },
                  inputs: {
                    type: "array",
                    description: "پارامترهای ورودی قالب",
                    items: {
                      type: "object",
                      required: ["param", "value"],
                      properties: {
                        param: {
                          type: "string",
                          description: "نام پارامتر ورودی",
                          example: "Code"
                        },
                        value: {
                          type: "string",
                          description: "مقدار پارامتر ورودی",
                          example: "1234"
                        }
                      }
                    }
                  },
                  udh: {
                    type: "boolean",
                    description: "برای تعیین نوع ارسال پیام ها که می تواند 16 یا 8 بیتی باشد. این پارامتر فقط برای پیش شماره 9000 اعمال می شود.",
                    example: false
                  },
                  isVoice: {
                    type: "boolean",
                    description: "صوتی بودن یا نبودن پیام را مشخص می کند.",
                    example: false
                  }
                }
              },
              examples: {
                example1: {
                  summary: "نمونه درخواست",
                  value: {
                    sendDate: "2024-12-25T09:51:45Z",
                    receptors: [
                      {
                        mobile: "0919********",
                        clientReferenceId: "1"
                      },
                      {
                        mobile: "0937********",
                        clientReferenceId: "2"
                      }
                    ],
                    templateName: "Ghasedak",
                    inputs: [
                      {
                        param: "Code",
                        value: "1234"
                      }
                    ],
                    udh: false,
                    isVoice: false
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
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
                        items: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              messageBody: {
                                type: "string",
                                description: "متن پیام OTP"
                              },
                              receptor: {
                                type: "string",
                                description: "شماره گیرنده"
                              },
                              cost: {
                                type: "integer",
                                description: "هزینه ارسال OTP"
                              },
                              messageId: {
                                type: "string",
                                description: "شناسه OTP"
                              },
                              clientReferenceId: {
                                type: "string",
                                description: "شناسه محلی کاربر"
                              },
                              sendDate: {
                                type: "string",
                                format: "date-time",
                                description: "زمان و تاریخ ارسال OTP"
                              }
                            }
                          }
                        },
                        totalCost: {
                          type: "integer",
                          description: "هزینه کلی ارسال OTP"
                        }
                      }
                    }
                  }
                },
                examples: {
                  example1: {
                    summary: "نمونه پاسخ",
                    value: {
                      isSuccess: true,
                      statusCode: 200,
                      message: "با موفقیت انجام شد",
                      data: {
                        items: [
                          {
                            messageBody: "به سامانه پیام کوتاه قاصدک خوش آمدید کد تایید شما 1234 می باشد ",
                            receptor: "0937********",
                            cost: 840,
                            messageId: "23304979",
                            clientReferenceId: "2",
                            sendDate: "2024-12-25T09:59:45.599126+03:30"
                          },
                          {
                            messageBody: "به سامانه پیام کوتاه قاصدک خوش آمدید کد تایید شما 1234 می باشد ",
                            receptor: "0919********",
                            cost: 850,
                            messageId: "23304980",
                            clientReferenceId: "1",
                            sendDate: "2024-12-25T09:59:45.599126+03:30"
                          }
                        ],
                        totalCost: 1690
                      }
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
