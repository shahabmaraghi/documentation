export const outboxStatusApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "وضعیت پیام های ارسالی - Ghasedak SMS API",
    version: "1.0.0",
    description: "بررسی وضعیت پیامک‌های ارسالی",
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
    "/WebService/CheckSmsStatus": {
      get: {
        summary: "وضعیت پیام های ارسالی",
        description: `دریافت وضعیت پیامک‌های ارسالی بر اساس شناسه.

با هر بار فراخوانی این متد، امکان دریافت وضعیت ۱۰۰ پیامک وجود دارد.
می‌توانید گزارش وضعیت را بر اساس messageId یا clientReferenceId دریافت کنید.`,
        operationId: "checkSmsStatus",
        tags: ["Status", "Reports"],
        security: [
          {
            ApiKey: []
          }
        ],
        "x-code-samples": [
          {
            lang: "curl",
            label: "cURL",
            source: `curl -X GET "https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus?Ids=23879310,23879311&Type=1" \\
  -H "ApiKey: your-api-key-here"`
          },
          {
            lang: "php",
            label: "PHP",
            source: `<?php
$ids = "23879310,23879311"; // یا clientReferenceIds
$type = 1; // 1 برای messageId، 2 برای clientReferenceId
$apiKey = "your-api-key-here";

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => "https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus?Ids=" . urlencode($ids) . "&Type=" . $type,
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
        foreach ($result['Data'] as $sms) {
            echo "پیام {$sms['MessageId']}: وضعیت {$sms['Status']}\\n";
        }
    }
}
?>`
          },
          {
            lang: "javascript",
            label: "Node.js",
            source: `const axios = require('axios');

const checkSmsStatus = async (ids, type = 1) => {
  try {
    const response = await axios.get(
      'https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus',
      {
        params: {
          Ids: ids.join(','), // آرایه از IDs
          Type: type // 1: messageId, 2: clientReferenceId
        },
        headers: {
          'ApiKey': 'your-api-key-here'
        }
      }
    );
    
    if (response.data.IsSuccess) {
      response.data.Data.forEach(sms => {
        console.log(\`پیام \${sms.MessageId}: وضعیت \${sms.Status}\`);
        console.log(\`گیرنده: \${sms.Receptor}, هزینه: \${sms.Price}\`);
      });
      return response.data.Data;
    }
  } catch (error) {
    console.error('خطا:', error.response?.data || error.message);
  }
};

// استفاده
checkSmsStatus(['23879310', '23879311'], 1);`
          },
          {
            lang: "python",
            label: "Python",
            source: `import requests

def check_sms_status(ids, id_type=1):
    """
    بررسی وضعیت پیامک‌ها
    
    Args:
        ids: لیست شناسه‌ها
        id_type: 1 برای messageId، 2 برای clientReferenceId
    """
    url = "https://gateway.ghasedak.me/rest/api/v1/WebService/CheckSmsStatus"
    headers = {"ApiKey": "your-api-key-here"}
    params = {
        "Ids": ",".join(ids),
        "Type": id_type
    }
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        result = response.json()
        
        if result.get('IsSuccess'):
            for sms in result['Data']:
                print(f"پیام {sms['MessageId']}: وضعیت {sms['Status']}")
                print(f"گیرنده: {sms['Receptor']}, هزینه: {sms['Price']}")
            return result['Data']
    except requests.exceptions.RequestException as e:
        print(f"خطا: {e}")
        return None

# استفاده
check_sms_status(['23879310', '23879311'], 1)`
          }
        ],
        parameters: [
          {
            name: "ApiKey",
            in: "header",
            required: true,
            description: "کلید احراز هویت برای مشاهده وضعیت پیام‌ها.",
            schema: {
              type: "string"
            }
          },
          {
            name: "Ids",
            in: "query",
            required: true,
            description: "شناسه پیامک که با ( , ) ازهم جدا می شوند. (که می تواند clientReferenceId یا messageId باشد.)",
            schema: {
              type: "string",
              example: "23879310,23879311"
            }
          },
          {
            name: "Type",
            in: "query",
            required: true,
            description: "نوع id پیام را مشخص می کند. ( 1 برای messageid و 2 برای clientReferenceId )",
            schema: {
              type: "integer",
              enum: [1, 2],
              example: 1
            }
          }
        ],
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
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          messageId: {
                            type: "string",
                            description: "شناسه پیام"
                          },
                          clientReferenceId: {
                            type: "string",
                            description: "شناسه محلی کاربر برای هر پیامک"
                          },
                          message: {
                            type: "string",
                            description: "متن پیام"
                          },
                          lineNumber: {
                            type: "string",
                            description: "شماره خط ارسال پیام"
                          },
                          receptor: {
                            type: "string",
                            description: "گیرنده"
                          },
                          status: {
                            type: "integer",
                            description: "وضعیت پیام (0: بدون وضعیت، 1: لغو شده، 2: بلک لیست، 3: تحویل به اپراتور، 4: به گوشی نرسیده، 5: رسیده به گوشی، 6: ارسال با خطا، 7: حالت خطایابی، 8: نامشخص)"
                          },
                          price: {
                            type: "integer",
                            description: "هزینه پیام"
                          },
                          sendDate: {
                            type: "string",
                            format: "date-time",
                            description: "تاریخ ارسال پیام"
                          }
                        }
                      }
                    }
                  }
                },
                examples: {
                  example1: {
                    summary: "نمونه پاسخ",
                    value: {
                      Data: [
                        {
                          MessageId: "2387931",
                          ClientReferenceId: "11111",
                          Message: "کد ورود شما 1234\nشرکت Ghasedak\nلغو11",
                          LineNumber: "21*******",
                          Receptor: "09396387926",
                          Status: 6,
                          Price: 940,
                          SendDate: "2024-07-09T14:01:02.193563"
                        },
                        {
                          MessageId: "4248",
                          ClientReferenceId: "22222",
                          Message: "test dotnet package bulk",
                          LineNumber: "21*******",
                          Receptor: "09396387926",
                          Status: 0,
                          Price: 1805,
                          SendDate: "2024-07-09T14:01:36.6632614"
                        }
                      ],
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
