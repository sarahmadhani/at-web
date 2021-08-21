Feature: [2]Button on Flip.id

    Background: Open browser Flip.is
        Given a web browser is at Flip.id

    Scenario Outline: <button> Button Assertion on Nave Flip.id
        Then User can see '<button>'

        Examples:
            | button  |
            | Bantuan |
            | Karir   |
            | Biaya   |
            | Masuk   |

    Scenario Outline: <button> Action Button on Nave Flip.id
        When User can click '<button>'
        Then User is in '<url>'
        Examples:
            | button  | url                              |
            | Bantuan | https://flipid.zendesk.com/hc/id |
            | Karir   | https://career.flip.id/jobs      |
            | Biaya   | https://flip.id/site/biaya       |
            | Masuk   | https://flip.id/login            |

